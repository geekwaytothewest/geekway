import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NextConventionWhereGQL, Convention, SingleConventionTypeGQL } from 'src/generated/types.graphql-gen';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { OembedService } from 'src/app/shared/oembed/oembed.service';
import iframely from '@iframely/embed.js';
import moment from 'moment';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-geekwaymini',
  templateUrl: './geekwaymini.component.html',
  styleUrls: ['./geekwaymini.component.scss']
})
export class GeekwayminiComponent implements OnInit, OnDestroy, AfterViewChecked {

  geekwayMini: Observable<any>;
  geekwayMiniSubscription: Subscription;
  geekwayType: Observable<any>;
  geekwayTypeSubscription: Subscription;
  content: SafeHtml;
  workingContent: string;
  mapCount = 0;
  todaysDate = new Date();
  endRegDate = null;

  venueCenterLat: string;
  venueCenterLng: string;
  markers: any = [];

  doorPrizeGalleryItems: GalleryItem[] = [];
  venueMapsGalleryItems: GalleryItem[] = [];

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private singleConventionType: SingleConventionTypeGQL,
    private sanitizer: DomSanitizer,
    private router: Router,
    private oembedService: OembedService
  ) { }

  ngOnInit() {
    const whereClauseGWT = {
      Name: 'Geekway Mini',
    };

    this.geekwayType = this.singleConventionType.watch({whereClause: whereClauseGWT})
      .valueChanges
      .pipe(
        map(result => result.data.conventiontypes[0])
      );

    this.geekwayTypeSubscription = this.geekwayType.subscribe(result => {
      this.workingContent = result.Content;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
    });

    const whereClauseGW = {
      Type: 'GeekwayMini',
      endDate_gt: new Date().toISOString()
    };

    this.geekwayMini = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(
        map(result => result.data.conventions[0])
      );

    this.geekwayMiniSubscription = this.geekwayMini.subscribe(result => {
      for (const v of result.venues) {
        this.mapCount += v.maps.length;
      }

      this.workingContent = result.conventionType.Content;
      if (result.regDates != null && result.regDates.length > 0) {
        this.endRegDate = new Date(Math.max(...result.regDates.map(rd => new Date(rd.dateClosed).getTime())));
      }

      for (const match of result.conventionType.Content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent
                                  .replace(match[0], oembed.html)
                                  .replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/');
        });
      }

      this.content = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);

      this.venueCenterLat = result.PrimaryVenue.Lat;
      this.venueCenterLng = result.PrimaryVenue.Long;
      for (let v of result.venues) {
        this.markers.push({
          position: { lat: v.Lat, lng: v.Long},
          label: v.Name
        })

        for (let p of v.maps) {
          this.venueMapsGalleryItems.push(new ImageItem({
            src: 'https://cms.geekway.com' + p.url,
            thumb: 'https://cms.geekway.com' + p.url
          }));
        }
      }

      for (let p of result.doorPrizes) {
        this.doorPrizeGalleryItems.push(new ImageItem({
          src: 'https://cms.geekway.com' + p.Boxart.url,
          thumb: 'https://cms.geekway.com' + p.Boxart.url
        }));
      }
    });
  }

  ngOnDestroy() {
    if (this.geekwayMiniSubscription) {
      this.geekwayMiniSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    const el = document.querySelector('app-geekwaymini')?.shadowRoot?.querySelector('.iframely-embed iframe');
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

  isRegistrationOpen(reg) {
    return moment(reg.date).isBefore(moment(this.todaysDate)) && moment(reg.dateClosed).isAfter(moment(this.todaysDate));
  }

  isRegistrationSoon(reg) {
    return moment(reg.date).isAfter(moment(this.todaysDate));
  }

}
