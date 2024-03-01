import { AfterViewChecked, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SingleEventGQL, Premiereevent } from 'src/generated/types.graphql-gen';
import { switchMap, map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import iframely from '@iframely/embed.js';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';
import { OembedService } from 'src/app/shared/oembed/oembed.service';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EventComponent implements OnInit, AfterViewChecked, OnDestroy {

  event: Observable<Premiereevent>;
  eventSubscription: Subscription;
  eventContent: SafeHtml;
  workingContent: string;

  galleryItems: GalleryItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private singleEventGQL: SingleEventGQL,
    private sanitizer: DomSanitizer,
    private headerPhoto: HeaderPhotoService,
    private oembedService: OembedService
  ) { }

  ngOnInit() {
    this.event = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const whereClauseGW = {
          Slug: params.get('slug')
        };

        return this.singleEventGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(
            map(result => result.data.premiereevents[0])
          );
      })
    );

    this.eventSubscription = this.event.subscribe(result => {
      this.workingContent = result.content.replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/');

      for (const match of result.Content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent
                                  .replace(match[0], oembed.html);
          this.eventContent = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
        });
      }

      this.headerPhoto.announceHeaderLabelChanged(result.Name);
      this.headerPhoto.announceHeaderPhotoChanged('https://cms.geekway.com' + result.HeaderPhoto.url);

      for (let p of result.Photos) {
        this.galleryItems.push(new ImageItem({
          src: 'https://cms.geekway.com' + p.url,
          thumb: 'https://cms.geekway.com' + p.url
        }));
      }
    });

  }

  ngOnDestroy() {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    const el = document.querySelector('app-event')?.shadowRoot?.querySelector('.iframely-embed iframe');
    iframely.iframely.load(el);
  }

}
