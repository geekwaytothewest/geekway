import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Meta, Title } from '@angular/platform-browser';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  geekwayToTheWest: Observable<Convention>;
  geekwayToTheWestSubscription: Subscription;
  geekwayToTheWestConvention: Convention;

  geekwayMini: Observable<Convention>;
  geekwayMiniSubscription: Subscription;
  geekwayMiniConventoin: Convention;

  geekwayMicro: Observable<Convention>;
  geekwayMicroSubscription: Subscription
  geekwayMicroConvention: Convention;
  
  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL, 
    private nextGWMiniConventionWhere: NextConventionWhereGQL, 
    private nextGWMicroConventionWhere: NextConventionWhereGQL,
    private router: Router,
    private meta: Meta,
    private title: Title
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
        map(result => result.data.conventions[0])
      );

    this.geekwayToTheWestSubscription = this.geekwayToTheWest.subscribe(c => this.geekwayToTheWestConvention = c);

    let whereClauseGWMini = {
      "Type": "GeekwayMini",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMini = this.nextGWMiniConventionWhere.watch({whereClause: whereClauseGWMini})
      .valueChanges
      .pipe(
        map(result => result.data.conventions[0])
      );
      
    this.geekwayMiniSubscription = this.geekwayMini.subscribe(c => this.geekwayMicroConvention = c);
    
    let whereClauseGWMicro = {
      "Type": "GeekwayMicro",
      "endDate_gt": new Date().toISOString()
    };

    this.geekwayMicro = this.nextGWMicroConventionWhere.watch({whereClause: whereClauseGWMicro})
      .valueChanges
      .pipe(
        map(result => result.data.conventions[0])
      );
      
    this.geekwayMicroSubscription = this.geekwayMicro.subscribe(c => this.geekwayMicroConvention = c);
  }

  ngOnDestroy() {
    if (this.geekwayToTheWestSubscription) {
      this.geekwayToTheWestSubscription.unsubscribe();
    }

    if (this.geekwayMiniSubscription) {
      this.geekwayMiniSubscription.unsubscribe();
    }

    if (this.geekwayMicroSubscription) {
      this.geekwayMicroSubscription.unsubscribe();
    }
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
