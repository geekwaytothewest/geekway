import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OembedService } from 'src/app/shared/oembed/oembed.service';
import iframely from '@iframely/embed.js';

@Component({
  selector: 'app-geekwaymicro',
  templateUrl: './geekwaymicro.component.html',
  styleUrls: ['./geekwaymicro.component.scss']
})
export class GeekwaymicroComponent implements OnInit, OnDestroy, AfterViewChecked {

  geekwayMicro: Observable<Convention>;
  geekwayMicroSubscription: Subscription;
  content: SafeHtml;
  workingContent: string;
  mapCount = 0;

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private sanitizer: DomSanitizer,
    private router: Router,
    private oembedService: OembedService
  ) { }

  ngOnInit() {

    const whereClauseGW = {
      Type: 'GeekwayMicro',
      endDate_gt: new Date().toISOString()
    };

    this.geekwayMicro = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(
        map(result => result.data.conventions[0])
      );

    this.geekwayMicroSubscription = this.geekwayMicro.subscribe(result => {
      for (const v of result.venues) {
        this.mapCount += v.maps.length;
      }

      this.workingContent = result.conventionType.Content;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);

      for (const match of result.conventionType.Content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent.replace(match[0], oembed.html).replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/');
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.geekwayMicroSubscription) {
      this.geekwayMicroSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    const el = document.querySelector('app-geekwaymicro')?.shadowRoot.querySelector('.iframely-embed iframe');
    iframely.iframely.load(el);
  }

  redirect(url: string) {
    console.log(url);
    if (url.startsWith('http')) {
      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
        skipLocationChange: true,
      });
    } else {
      this.router.navigate([url]);
    }

    event.preventDefault();
  }

}
