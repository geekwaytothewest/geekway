import { AfterViewChecked, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Policy, SinglePolicyGQL } from 'src/generated/types.graphql-gen';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import iframely from '@iframely/embed.js';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';
import { OembedService } from 'src/app/shared/oembed/oembed.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class PolicyComponent implements OnInit, AfterViewChecked, OnDestroy {

  policy: Observable<Policy>;
  policySubscription: Subscription;
  policyContent: SafeHtml;
  workingContent: string;

  constructor(
    private route: ActivatedRoute,
    private singlePolicyGQL: SinglePolicyGQL,
    private sanitizer: DomSanitizer,
    private headerPhoto: HeaderPhotoService,
    private oembedService: OembedService
  ) { }

  ngOnInit() {
    this.policy = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const whereClauseGW = {
          Slug: params.get('slug')
        };

        return this.singlePolicyGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(
            map(result => result.data.policies[0])
          );
      })
    );

    this.policySubscription = this.policy.subscribe(result => {
      this.workingContent = result.Content;
      this.policyContent = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);

      for (const match of result.Content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent.replace(match[0], oembed.html).replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/');
          this.policyContent = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
        });
      }

      this.headerPhoto.announceHeaderPhotoChanged('https://cms.geekway.com' + result.HeaderPhoto.url);
      this.headerPhoto.announceHeaderLabelChanged(result.Name);
    });
  }

  ngOnDestroy() {
    if (this.policySubscription) {
      this.policySubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    const el = document.querySelector('app-policy')?.shadowRoot.querySelector('.iframely-embed iframe');
    iframely.iframely.load(el);
  }

}
