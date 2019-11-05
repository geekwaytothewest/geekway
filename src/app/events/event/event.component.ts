import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SingleEventGQL, Premiereevent } from 'src/generated/types.graphql-gen';
import { switchMap, map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import iframely from '@iframely/embed.js';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: Observable<Premiereevent>;
  eventSubscription: Subscription;
  eventContent: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private singleEventGQL: SingleEventGQL,
    private sanitizer: DomSanitizer,
    public headerPhoto: HeaderPhotoService
  ) { }

  ngOnInit() {
    this.event = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {        
        let whereClauseGW = {
          "Slug": params.get('slug')
        };

        return this.singleEventGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(        
            map(result => result.data.premiereevents[0])
          );
      })
    );

    this.eventSubscription = this.event.subscribe(result => {
      this.eventContent = this.sanitizer.bypassSecurityTrustHtml(result.Content.replace('<oembed url=', ' <div class="iframely-embed"><div class="iframely-responsive"><a data-iframely-url href=') + '</div></div>');
      this.headerPhoto.announceHeaderLabelChanged(result.Name);
      this.headerPhoto.announceHeaderPhotoChanged("https://cms.geekwaytothewest.com/" + result.HeaderPhoto.url);
    })
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    iframely.iframely.load();
  }

}
