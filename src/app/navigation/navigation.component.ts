import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Policy, PoliciesGQL, EventsGQL, Premiereevent } from 'src/generated/types.graphql-gen';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  policies: Observable<Policy[]>;
  policiesSubscription: Subscription;

  events: Observable<Premiereevent[]>;
  eventsSubscription: Subscription;

  showSidenav: boolean = false;
  showAboutSubnav: boolean = false;
  showPoliciesSubnav: boolean = false;
  showEventsSubnav: boolean = false;

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
    private eventsGQL: EventsGQL
  ) {}

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
    this.policiesSubscription.unsubscribe();
    this.eventsSubscription.unsubscribe();
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

  showSubnav(subnav: string) {
    switch (subnav) {
      case "about":
        this.showAboutSubnav = true;
        this.showPoliciesSubnav = false;
        this.showEventsSubnav = false;
        break;
      case "policies":
        this.showAboutSubnav = false;
        this.showPoliciesSubnav = true;
        this.showEventsSubnav = false;
        break;
      case "events":
        this.showAboutSubnav = false;
        this.showPoliciesSubnav = false;
        this.showEventsSubnav = true;
        break;
      default:
        this.showAboutSubnav = false;
        this.showPoliciesSubnav = false;
        this.showEventsSubnav = false;
        break;
    }
  }

}
