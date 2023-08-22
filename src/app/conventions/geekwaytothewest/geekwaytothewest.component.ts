import { AfterViewChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OembedService } from 'src/app/shared/oembed/oembed.service';
import iframely from '@iframely/embed.js';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import moment from 'moment';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-geekwaytothewest',
  templateUrl: './geekwaytothewest.component.html',
  styleUrls: ['./geekwaytothewest.component.scss']
})
export class GeekwaytothewestComponent implements OnInit, OnDestroy, AfterViewChecked {

  geekwayToTheWest: Observable<any>;
  geekwayToTheWestSubscription: Subscription;
  playAndWinDataSource: MatTableDataSource<any>;
  content: SafeHtml;
  workingContent: string;
  paginator: MatPaginator;
  sort: MatSort;
  mapCount = 0;
  todaysDate = new Date();
  endRegDate = new Date();

  columnsToDisplay = ['Image', 'Name'];

  nameFilter = new FormControl();

  filterValues = {
    name: '',
  };

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;

    if (this.playAndWinDataSource) {
      this.playAndWinDataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;

    if (this.playAndWinDataSource) {
      this.playAndWinDataSource.paginator = this.paginator;
    }
  }

  venueCenterLat: string;
  venueCenterLng: string;
  markers: any = [];

  doorPrizeGalleryItems: GalleryItem[] = [];
  venueMapsGalleryItems: [GalleryItem[]] = [[]];

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

      this.playAndWinDataSource = new MatTableDataSource();
      this.playAndWinDataSource.data = result.playAndWins;
      this.playAndWinDataSource.sort = this.sort;
      this.playAndWinDataSource.paginator = this.paginator;
      this.playAndWinDataSource.filterPredicate = this.tableFilter();

      if (result.regDates != null && result.regDates.length > 0) {
        this.endRegDate = new Date(Math.max(...result.regDates.map(rd => new Date(rd.dateClosed).getTime())));
      }

      this.nameFilter.valueChanges.subscribe(name => {
        this.filterValues.name = name;
        this.playAndWinDataSource.filter = JSON.stringify(this.filterValues);
      });

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

      this.venueCenterLat = result.PrimaryVenue.Lat;
      this.venueCenterLng = result.PrimaryVenue.Long;
      for (let v of result.venues) {
        this.markers.push({
          position: { lat: v.Lat, lng: v.Long},
          label: v.Name
        });

        this.venueMapsGalleryItems[v.id] = [];
        for (let p of v.maps) {
          this.venueMapsGalleryItems[v.id].push(new ImageItem({
            src: 'https://cms.geekway.com' + p.url,
            thumb: 'https://cms.geekway.com' + p.url
          }));
        }
      }

      for (let p of result.doorPrizes) {
        this.doorPrizeGalleryItems.push(new ImageItem({
          src: 'https://cms.geekway.com' + p.url,
          thumb: 'https://cms.geekway.com' + p.url
        }));
      }
    });
  }

  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);

      const nameFound = data.Name.toLowerCase().indexOf(searchTerms.name) !== -1;

      return nameFound;
    };

    return filterFunction;
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

  isRegistrationOpen(reg) {
    return moment(reg.date).isBefore(moment(this.todaysDate)) && moment(reg.dateClosed).isAfter(moment(this.todaysDate));
  }

  isRegistrationSoon(reg) {
    return moment(reg.date).isAfter(moment(this.todaysDate));
  }
}
