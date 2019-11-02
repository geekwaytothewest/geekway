import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NextConventionWhereGQL, Convention } from 'src/generated/types.graphql-gen';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-geekwaymini',
  templateUrl: './geekwaymini.component.html',
  styleUrls: ['./geekwaymini.component.scss']
})
export class GeekwayminiComponent implements OnInit {

  geekwayMini: Observable<Convention>;
  geekwayMiniSubscription: Subscription;

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private router: Router
  ) { }

  ngOnInit() {
    let whereClauseGW = {
      "Type": "GeekwayMini",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMini = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions[0])
      );

    this.geekwayMiniSubscription = this.geekwayMini.subscribe();
  }

}
