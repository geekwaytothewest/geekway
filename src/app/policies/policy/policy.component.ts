import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy, SinglePolicyGQL } from 'src/generated/types.graphql-gen';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  policy: Observable<Policy>;

  constructor(
    private route: ActivatedRoute,
    private singlePolicyGQL: SinglePolicyGQL
  ) { }

  ngOnInit() {
    this.policy = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {        
        let whereClauseGW = {
          "Slug": params.get('slug')
        };

        console.log(whereClauseGW);

        return this.singlePolicyGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(        
            map(result => result.data.policies[0])
          );
      })
    );
  }

}
