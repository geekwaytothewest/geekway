import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SingleEventGQL, Premiereevent } from 'src/generated/types.graphql-gen';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event: Observable<Premiereevent>;

  constructor(
    private route: ActivatedRoute,
    private singleEventGQL: SingleEventGQL
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
  }

}
