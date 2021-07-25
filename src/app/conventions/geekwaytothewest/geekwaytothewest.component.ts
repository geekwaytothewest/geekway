import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OembedService } from 'src/app/shared/oembed/oembed.service';
import iframely from '@iframely/embed.js';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-geekwaytothewest',
  templateUrl: './geekwaytothewest.component.html',
  styleUrls: ['./geekwaytothewest.component.scss']
})
export class GeekwaytothewestComponent implements OnInit, OnDestroy, AfterViewChecked {

  geekwayToTheWest: Observable<Convention>;
  geekwayToTheWestSubscription: Subscription;
  playAndWinDataSource: MatTableDataSource<any>;
  content: SafeHtml;
  workingContent: string;
  mapCount = 0;

  columnsToDisplay = ['Image', 'Name'];

  nameFilter = new FormControl();

  filterValues = {
    name: '',
  };

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private sanitizer: DomSanitizer,
    private router: Router,
    private oembedService: OembedService
  ) { }

  ngOnInit() {
    const whereClauseGW = {
      Type: 'GeekwayToTheWest',
      endDate_gt: new Date().toISOString()
    };

    this.geekwayToTheWest = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(
        map(result => result.data.conventions[0])
      );

    this.geekwayToTheWestSubscription = this.geekwayToTheWest.subscribe(result => {
      for (const v of result.venues) {
        this.mapCount += v.maps.length;
      }

      this.workingContent = result.conventionType.Content;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);

      for (const match of result.conventionType.Content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent
                                  .replace(match[0], oembed.html)
                                  .replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/');
          this.content = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
        });
      }

      this.content = this.sanitizer.bypassSecurityTrustHtml(
        result.conventionType.Content
          .replace(
            /<oembed url=(.*)><\/oembed>/,
            ' <div class="iframely-embed"><div class="iframely-responsive"><a data-iframely-url href=$1></div></div>'
          )
      );
    });
  }

  ngOnDestroy() {
    if (this.geekwayToTheWestSubscription) {
      this.geekwayToTheWestSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    const el = document.querySelector('app-geekwaytothewest')?.shadowRoot?.querySelector('.iframely-embed iframe');
    iframely.iframely.load(el);
  }

  redirect(url: string) {
    if (url.startsWith('http')) {
      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
        skipLocationChange: true,
      });
    } else {
      this.router.navigate([url]);
    }

    event.preventDefault();
  }

  bggRedirect(bggId: string) {
    window.open('https://boardgamegeek.com/boardgame/' + bggId, '_blank');
  }

  playAndWinPaginateChange(event: any) {
    document.getElementById('playAndWinCard').scrollIntoView();
  }

}
