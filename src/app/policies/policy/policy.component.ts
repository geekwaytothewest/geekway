import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy, SinglePolicyGQL } from 'src/generated/types.graphql-gen';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import iframely from '@iframely/embed.js';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  policy: Observable<Policy>;
  policyContent: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private singlePolicyGQL: SinglePolicyGQL,
    private sanitizer: DomSanitizer
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

    this.policy.subscribe(result => {
      this.policyContent = this.sanitizer.bypassSecurityTrustHtml(result.Content);
    })
  }

  ngAfterContentInit() {
    iframely.iframely.extendOptions({api_key: '24efd7ca731658c92b362e'});
    iframely.iframely.load();
  }

}
