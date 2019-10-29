import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  geekwayToTheWest: Observable<Convention[]>;
  geekwayToTheWestSubscription: Subscription;

  geekwayMini: Observable<Convention[]>;
  geekwayMiniSubscription: Subscription;

  geekwayMicro: Observable<Convention[]>;
  geekwayMicroSubscription: Subscription
  
  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL, 
    private nextGWMiniConventionWhere: NextConventionWhereGQL, 
    private nextGWMicroConventionWhere: NextConventionWhereGQL,
    private router: Router
  ) { 
  }

  ngOnInit() {
    let whereClauseGW = {
      "Type": "GeekwayToTheWest",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayToTheWest = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(        
        map(result => result.data.conventions)
      );

    this.geekwayToTheWestSubscription = this.geekwayToTheWest.subscribe();

    let whereClauseGWMini = {
      "Type": "GeekwayMini",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMini = this.nextGWMiniConventionWhere.watch({whereClause: whereClauseGWMini})
      .valueChanges
      .pipe(
        map(result => result.data.conventions)
      );
      
    this.geekwayMiniSubscription = this.geekwayMini.subscribe();
    
    let whereClauseGWMicro = {
      "Type": "GeekwayMicro",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMicro = this.nextGWMicroConventionWhere.watch({whereClause: whereClauseGWMicro})
      .valueChanges
      .pipe(
        map(result => result.data.conventions)
      );
      
    this.geekwayMicroSubscription = this.geekwayMicro.subscribe();
  }

  ngOnDestroy() {
    // Only need to unsubscribe if its a multi event Observable
    this.geekwayToTheWestSubscription.unsubscribe();
    this.geekwayMiniSubscription.unsubscribe();
    this.geekwayMicroSubscription.unsubscribe();
  }

  redirect(url: string) {
    console.log(url);
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
