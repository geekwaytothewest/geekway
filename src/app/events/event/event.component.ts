import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SingleEventGQL, Premiereevent } from 'src/generated/types.graphql-gen';
import { switchMap, map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import iframely from '@iframely/embed.js';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: Observable<Premiereevent>;
  eventContent: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private singleEventGQL: SingleEventGQL,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.event = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {        
        let whereClauseGW = {
          "Slug": params.get('slug')
        };

        console.log(whereClauseGW);

        return this.singleEventGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(        
            map(result => result.data.premiereevents[0])
          );
      })
    );

    this.event.subscribe(result => {
      this.eventContent = this.sanitizer.bypassSecurityTrustHtml(result.Content);
    })
  }

  ngOnChanges() {
    iframely.iframely.extendOptions({api_key: '24efd7ca731658c92b362e'});
    iframely.iframely.load();
  }

}
