import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators'
import { NextConventionWhereGQL } from 'src/generated/types.graphql-gen';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  geekwayToTheWest: Observable<any[]>;
  geekwayToTheWestSubscription: Subscription;
  
  constructor(private nextConventionWhere: NextConventionWhereGQL) { 
  }

  ngOnInit() {
    let whereClause = {
      "Type": "GeekwayToTheWest",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayToTheWest = this.nextConventionWhere.watch({whereClause: whereClause})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions)
      )

    this.geekwayToTheWestSubscription = this.geekwayToTheWest.subscribe()
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
    this.geekwayToTheWestSubscription.unsubscribe();
  }

}
