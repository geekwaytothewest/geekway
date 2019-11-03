import { Component, OnInit } from '@angular/core';
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
export class RegistrationComponent implements OnInit {

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
    // Only need to unsubscribe if its a multi event Observable
    this.geekwayToTheWestSubscription.unsubscribe();
    this.geekwayMiniSubscription.unsubscribe();
    this.geekwayMicroSubscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.meta.updateTag({ property: 'og:title', content: 'Geekway to the West - Four Days of Peace, Love, and Board Games | Registration' },  `property='og:title'`);
    this.meta.updateTag({ property: 'og:image', content: this.geekwayToTheWestConvention.Logo.url }, `property='og:image'`);
    this.meta.updateTag({ property: 'og:image:width', content: '982' }, `property='og:image:width'`);
    this.meta.updateTag({ property: 'og:image:height', content: '492' }, `property='og:image:height'`);
    this.meta.updateTag({ property: 'og:description', content: 'Registration begins' + moment(this.geekwayToTheWestConvention.registrationDates[0].date).tz('America/Chicago').format('MMMM Do YYYY, h:mm a') },)
    this.meta.updateTag({ name: 'twitter:description', content: 'Registration' }, `name='twitter:description'`);
    this.meta.updateTag({ name: 'twitter:image', content: this.geekwayToTheWestConvention.Logo.url }, `name='twitter:image'`);
    this.meta.updateTag({ name: 'twitter:image:alt', content: 'Geekway to the West - ' + this.geekwayToTheWestConvention.Theme }, `name='twitter:image:alt'`)

    this.title.setTitle("Geekway to the West - Four Days of Peace, Love, and Board Games | Registration");
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
