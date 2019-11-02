import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Policy, PoliciesGQL } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {

  policies: Observable<Policy[]>;
  policiesSubscription: Subscription;

  constructor(private policiesGQL: PoliciesGQL) { }

  ngOnInit() {
    this.policies = this.policiesGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.policies)
      );

    this.policiesSubscription = this.policies.subscribe();
  }

  ngOnDestroy() {
    this.policiesSubscription.unsubscribe();
  }

}
