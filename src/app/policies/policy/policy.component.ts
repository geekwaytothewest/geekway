import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Policy, SinglePolicyGQL } from 'src/generated/types.graphql-gen';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import iframely from '@iframely/embed.js';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  policy: Observable<Policy>;
  policySubscription: Subscription;
  policyContent: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private singlePolicyGQL: SinglePolicyGQL,
    private sanitizer: DomSanitizer,
    private headerPhoto: HeaderPhotoService
  ) { }

  ngOnInit() {
    iframely.iframely.extendOptions({api_key: '24efd7ca731658c92b362e'});
    
    this.policy = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {        
        let whereClauseGW = {
          "Slug": params.get('slug')
        };

        return this.singlePolicyGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(        
            map(result => result.data.policies[0])
          );
      })
    );

    this.policySubscription = this.policy.subscribe(result => {
      this.policyContent = this.sanitizer.bypassSecurityTrustHtml(result.Content.replace('<oembed url=', ' <div class="iframely-embed"><div class="iframely-responsive"><a data-iframely-url href=') + '</div></div>');
      this.headerPhoto.announceHeaderPhotoChanged("https://cms.geekway.com/" + result.HeaderPhoto.url);
      this.headerPhoto.announceHeaderLabelChanged(result.Name);
    })
  }

  ngOnDestroy() {
    if (this.policySubscription) {
      this.policySubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    iframely.iframely.load();
  }

}
