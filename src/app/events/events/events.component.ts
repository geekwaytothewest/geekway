import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EventsGQL, Premiereevent } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {

  events: Observable<Premiereevent[]>;
  eventsSubscription: Subscription;

  constructor(
    private eventsGQL: EventsGQL,
    private headerPhoto: HeaderPhotoService
  ) { }

  ngOnInit() {
    this.events = this.eventsGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.premiereevents)
      );

    this.eventsSubscription = this.events.subscribe();

    this.headerPhoto.announceHeaderLabelChanged('Events');
    this.headerPhoto.announceHeaderPhotoChanged('/assets/images/fancygaming1.jpg');
  }

  ngOnDestroy() {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

}
