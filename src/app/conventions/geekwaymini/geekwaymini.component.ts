import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NextConventionWhereGQL, Convention } from 'src/generated/types.graphql-gen';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-geekwaymini',
  templateUrl: './geekwaymini.component.html',
  styleUrls: ['./geekwaymini.component.scss']
})
export class GeekwayminiComponent implements OnInit, OnDestroy {

  geekwayMini: Observable<Convention>;
  geekwayMiniSubscription: Subscription;
  content: SafeHtml;

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    let whereClauseGW = {
      "Type": "GeekwayMini",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMini = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions[0])
      );

    this.geekwayMiniSubscription = this.geekwayMini.subscribe(result => {
      this.content = this.sanitizer.bypassSecurityTrustHtml(result.conventionType.Content.replace(/<oembed url=(.*)><\/oembed>/, ' <div class="iframely-embed"><div class="iframely-responsive"><a data-iframely-url href=$1></div></div>'));
    });
  }

  ngOnDestroy() {
    if (this.geekwayMiniSubscription) {
      this.geekwayMiniSubscription.unsubscribe();
    }
  }

  redirect(url: string) {
    console.log(url);
    if (url.startsWith("http")) {
      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
        skipLocationChange: true,
      });
    } else {
      this.router.navigate([url]);
    }
    
    event.preventDefault();
  }

}
