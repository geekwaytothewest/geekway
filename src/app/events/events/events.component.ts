import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EventsGQL, Premiereevent } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Observable<Premiereevent[]>;
  eventsSubscription: Subscription;

  constructor(private eventsGQL: EventsGQL,) { }

  ngOnInit() {
    this.events = this.eventsGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.premiereevents)
      );

    this.eventsSubscription = this.events.subscribe();
  }

}
