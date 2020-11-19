import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-geekwaytothewest',
  templateUrl: './geekwaytothewest.component.html',
  styleUrls: ['./geekwaytothewest.component.scss']
})
export class GeekwaytothewestComponent implements OnInit, OnDestroy {

  geekwayToTheWest: Observable<Convention>;
  geekwayToTheWestSubscription: Subscription;
  content: SafeHtml;

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {
    let whereClauseGW = {
      "Type": "GeekwayToTheWest",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayToTheWest = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions[0])
      );

    this.geekwayToTheWestSubscription = this.geekwayToTheWest.subscribe(result => {      
      this.content = this.sanitizer.bypassSecurityTrustHtml(result.conventionType.Content.replace('<oembed url=', ' <div class="iframely-embed"><div class="iframely-responsive"><a data-iframely-url href=') + '</div></div>');
    });
  }

  ngOnDestroy() {
    if (this.geekwayToTheWestSubscription) {
      this.geekwayToTheWestSubscription.unsubscribe();
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
