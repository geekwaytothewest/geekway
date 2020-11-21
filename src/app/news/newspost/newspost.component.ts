import { AfterViewChecked, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import iframely from '@iframely/embed.js';
import { Observable, Subscription } from 'rxjs';
import { Newspost, SingleNewsPostGQL } from 'src/generated/types.graphql-gen';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';
import { OembedService } from 'src/app/shared/oembed/oembed.service';

@Component({
  selector: 'app-newspost',
  templateUrl: './newspost.component.html',
  styleUrls: ['./newspost.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class NewspostComponent implements OnInit, AfterViewChecked, OnDestroy {

  newsPost: Observable<Newspost>;
  newsPostSubscription: Subscription;
  newsContent: SafeHtml;
  workingContent: string;

  constructor(
    private route: ActivatedRoute,
    private singlePostGQL: SingleNewsPostGQL,
    private sanitizer: DomSanitizer,
    private headerPhotos: HeaderPhotoService,
    private oembedService: OembedService
  ) { }

  ngOnInit() {
    this.newsPost = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const whereClauseGW = {
          slug: params.get('slug')
        };

        return this.singlePostGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(
            map(result => result.data.newsposts[0])
          );
      })
    );

    this.newsPostSubscription = this.newsPost.subscribe(result => {
      this.workingContent = result.content;
      this.newsContent = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);

      for (const match of result.content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent.replace(match[0], oembed.html).replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/');
          this.newsContent = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
        });
      }

      this.headerPhotos.announceHeaderLabelChanged(result.Title);
      if (result.HeaderPhoto?.url) {
        this.headerPhotos.announceHeaderPhotoChanged('https://cms.geekway.com' + result.HeaderPhoto.url);
      }
    });
  }

  ngOnDestroy() {
    if (this.newsPostSubscription) {
      this.newsPostSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    const el = document.querySelector('app-newspost')?.shadowRoot.querySelector('.iframely-embed iframe');
    iframely.iframely.load(el);
  }

}
