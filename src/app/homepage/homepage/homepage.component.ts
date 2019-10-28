import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { NextConventionWhereGQL, Convention } from 'src/generated/types.graphql-gen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  geekwayToTheWest: Observable<Convention[]>;
  geekwayToTheWestSubscription: Subscription;

  geekwayMini: Observable<Convention[]>;
  geekwayMiniSubscription: Subscription;

  geekwayMicro: Observable<Convention[]>;
  geekwayMicroSubscription: Subscription
  
  constructor(private nextConventionWhere: NextConventionWhereGQL, private router: Router) { 
  }

  ngOnInit() {
    let whereClauseGW = {
      "Type": "GeekwayToTheWest",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayToTheWest = this.nextConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions)
      );

    this.geekwayToTheWestSubscription = this.geekwayToTheWest.subscribe();

    let whereClauseGWMini = {
      "Type": "GeekwayMini",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMini = this.nextConventionWhere.watch({whereClause: whereClauseGWMini})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions)
      );
      
    this.geekwayMiniSubscription = this.geekwayToTheWest.subscribe();
    
    let whereClauseGWMicro = {
      "Type": "GeekwayMicro",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMicro = this.nextConventionWhere.watch({whereClause: whereClauseGWMicro})
      .valueChanges
      .pipe(
        map(result => result.data.conventions)
      );
      
    this.geekwayMicroSubscription = this.geekwayToTheWest.subscribe();
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
    this.geekwayToTheWestSubscription.unsubscribe();
    this.geekwayMiniSubscription.unsubscribe();
    this.geekwayMicroSubscription.unsubscribe();
  }

  redirect(url: string) {
    if (url.startsWith("http")) {
      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
        skipLocationChange: true,
      });
    } else {
      this.router.navigate([url]);
    }
    
    event.preventDefault();
  }

}
