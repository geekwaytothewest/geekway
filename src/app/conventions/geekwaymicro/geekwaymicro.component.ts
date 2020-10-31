import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-geekwaymicro',
  templateUrl: './geekwaymicro.component.html',
  styleUrls: ['./geekwaymicro.component.scss']
})
export class GeekwaymicroComponent implements OnInit {

  geekwayMicro: Observable<Convention>;
  geekwayMicroSubscription: Subscription;
  content: SafeHtml;

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit() {

    let whereClauseGW = {
      "Type": "GeekwayMicro",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMicro = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions[0])
      );

    this.geekwayMicroSubscription = this.geekwayMicro.subscribe(result => {
      this.content = this.sanitizer.bypassSecurityTrustHtml(result.conventionType.Content.replace('<oembed url=', ' <div class="iframely-embed"><div class="iframely-responsive"><a data-iframely-url href=').replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/') + '</div></div>');
    });
  }

  ngOnDestroy() {
    if (this.geekwayMicroSubscription) {
      this.geekwayMicroSubscription.unsubscribe();
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
