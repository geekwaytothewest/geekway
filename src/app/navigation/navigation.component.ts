import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription, timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Policy, PoliciesGQL, EventsGQL, Premiereevent } from 'src/generated/types.graphql-gen';
import { Router } from '@angular/router';
import { HeaderPhotoService } from '../shared/header-photo/header-photo.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  providers: [HeaderPhotoService]
})
export class NavigationComponent {

  policies: Observable<Policy[]>;
  policiesSubscription: Subscription;

  events: Observable<Premiereevent[]>;
  eventsSubscription: Subscription;

  showSidenav: boolean = false;
  showSlogan: boolean = true;
  showAboutSubnav: boolean = false;
  showPoliciesSubnav: boolean = false;
  showEventsSubnav: boolean = false;
  showConventionsSubnav: boolean = false;

  headerPhotoSubscription: Subscription;
  headerLabelSubscription: Subscription;

  hoverTimer: Observable<number> = timer(250);
  hoverTimerSubscription: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private policiesGQL: PoliciesGQL,
    private eventsGQL: EventsGQL,
    public headerPhoto: HeaderPhotoService,
    public router: Router
  ) {
    this.headerPhotoSubscription = headerPhoto.headerPhotoChanged.subscribe();
    this.headerLabelSubscription = headerPhoto.headerLabelChanged.subscribe();
  }

  ngOnInit() {
    this.policies = this.policiesGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.policies)
      );

    this.policiesSubscription = this.policies.subscribe();

    this.events = this.eventsGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.premiereevents)
      );

    this.policiesSubscription = this.policies.subscribe();
  }

  ngOnDestroy() {
    if (this.policiesSubscription) {
      this.policiesSubscription.unsubscribe();
    }

    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }

    if (this.headerPhotoSubscription) {
      this.headerPhotoSubscription.unsubscribe();
    }

    if (this.headerLabelSubscription) {
      this.headerLabelSubscription.unsubscribe();
    }
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

  showSubnav(subnav: string) {
    this.hoverTimerSubscription = this.hoverTimer.subscribe(() => {
      switch (subnav) {
        case "about":
          this.showSlogan = false;
          this.showAboutSubnav = true;
          this.showPoliciesSubnav = false;
          this.showEventsSubnav = false;
          this.showConventionsSubnav = false;
          break;
        case "policies":
          this.showSlogan = false;
          this.showAboutSubnav = false;
          this.showPoliciesSubnav = true;
          this.showEventsSubnav = false;
          this.showConventionsSubnav = false;
          break;
        case "events":
          this.showSlogan = false;
          this.showAboutSubnav = false;
          this.showPoliciesSubnav = false;
          this.showEventsSubnav = true;
          this.showConventionsSubnav = false;
          break;
        case "conventions":
          this.showSlogan = false;
          this.showAboutSubnav = false;
          this.showPoliciesSubnav = false;
          this.showEventsSubnav = false;
          this.showConventionsSubnav = true;
          break;
        default:
          this.showSlogan = true;
          this.showAboutSubnav = false;
          this.showPoliciesSubnav = false;
          this.showEventsSubnav = false;
          this.showConventionsSubnav = false;
          break;
      }
    })
  }

  cancelSubnav() {
    if (this.hoverTimerSubscription) {
      this.hoverTimerSubscription.unsubscribe();
    }
  }

}
