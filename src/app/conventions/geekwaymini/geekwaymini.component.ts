import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NextConventionWhereGQL, Convention } from 'src/generated/types.graphql-gen';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OembedService } from 'src/app/shared/oembed/oembed.service';
import iframely from '@iframely/embed.js';

@Component({
  selector: 'app-geekwaymini',
  templateUrl: './geekwaymini.component.html',
  styleUrls: ['./geekwaymini.component.scss']
})
export class GeekwayminiComponent implements OnInit, OnDestroy, AfterViewChecked {

  geekwayMini: Observable<Convention>;
  geekwayMiniSubscription: Subscription;
  content: SafeHtml;
  workingContent: string;

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private sanitizer: DomSanitizer,
    private router: Router,
    private oembedService: OembedService
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
      this.workingContent = result.conventionType.Content;

      for (const match of result.conventionType.Content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent.replace(match[0], oembed.html).replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/')
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
        })
      }
    });
  }

  ngOnDestroy() {
    if (this.geekwayMiniSubscription) {
      this.geekwayMiniSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    var el = document.querySelector('app-page').shadowRoot.querySelector('.iframely-embed iframe');
    iframely.iframely.load(el);
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
