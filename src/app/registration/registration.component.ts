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

  geekwayToTheWest: Observable<any>;
  geekwayToTheWestSubscription: Subscription;
  geekwayToTheWestConvention: Convention;

  geekwayMini: Observable<any>;
  geekwayMiniSubscription: Subscription;
  geekwayMiniConventoin: Convention;

  geekwayMicro: Observable<any>;
  geekwayMicroSubscription: Subscription;
  geekwayMicroConvention: Convention;

  todaysDate = new Date();
  endRegDateGW = null;
  endRegDateGWMini = null;

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
    const whereClauseGW = {
      Type: 'GeekwayToTheWest',
      endDate_gt: new Date().toISOString()
    };

    this.geekwayToTheWest = this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
      .valueChanges
      .pipe(
        map(result => result.data.conventions[0])
      );

    this.geekwayToTheWestSubscription = this.geekwayToTheWest.subscribe(c => {
      this.geekwayToTheWestConvention = c;

      if (c.regDates != null && c.regDates.length > 0) {
        this.endRegDateGW = new Date(Math.max(...c.regDates.map(rd => new Date(rd.dateClosed).getTime())));
      }
    });

    const whereClauseGWMini = {
      Type: 'GeekwayMini',
      endDate_gt: new Date().toISOString()
    };

    this.geekwayMini = this.nextGWMiniConventionWhere.watch({whereClause: whereClauseGWMini})
      .valueChanges
      .pipe(
        map(result => result.data.conventions[0])
      );

    this.geekwayMiniSubscription = this.geekwayMini.subscribe(c => {
      this.geekwayMicroConvention = c;

      if (c.regDates != null && c.regDates.length > 0) {
        this.endRegDateGWMini = new Date(Math.max(...c.regDates.map(rd => new Date(rd.dateClosed).getTime())));
      }
    });

    const whereClauseGWMicro = {
      Type: 'GeekwayMicro',
      endDate_gt: new Date().toISOString()
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
    if (url.startsWith('http')) {
      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
        skipLocationChange: true,
      });
    } else {
      this.router.navigate([url]);
    }

    event.preventDefault();
  }

  isRegistrationOpen(reg) {
    return moment(reg.date).isBefore(moment(new Date())) && moment(reg.dateClosed).isAfter(moment(new Date()));
  }

  isRegistrationSoon(reg) {
    return moment(reg.date).isAfter(moment(new Date()));
  }

}
