import { AfterViewChecked, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Blogpost, SingleBlogPostGQL } from 'src/generated/types.graphql-gen';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import iframely from '@iframely/embed.js';
import { switchMap, map } from 'rxjs/operators';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';
import { OembedService } from 'src/app/shared/oembed/oembed.service';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class BlogpostComponent implements OnInit, AfterViewChecked, OnDestroy {

  blogPost: Observable<Blogpost>;
  blogPostSubscription: Subscription;
  blogContent: SafeHtml;
  workingContent: string;
  
  constructor(
    private route: ActivatedRoute,
    private singlePostGQL: SingleBlogPostGQL,
    private sanitizer: DomSanitizer,
    private headerPhotos: HeaderPhotoService,
    private oembedService: OembedService
  ) { }

  ngOnInit() {
    this.blogPost = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {        
        let whereClauseGW = {
          "slug": params.get('slug')
        };

        return this.singlePostGQL.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(        
            map(result => result.data.blogposts[0])
          );
      })
    );

    this.blogPostSubscription = this.blogPost.subscribe(result => {
      this.workingContent = result.content;
      this.blogContent = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);

      for (const match of result.content.matchAll(this.oembedService.oembedRegex)) {
        this.oembedService.getOembed(match[1]).subscribe(oembed => {
          this.workingContent = this.workingContent.replace(match[0], oembed.html).replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/');
          this.blogContent = this.sanitizer.bypassSecurityTrustHtml(this.workingContent);
        })
      }
      
      this.headerPhotos.announceHeaderLabelChanged(result.Title);
      this.headerPhotos.announceHeaderPhotoChanged("https://cms.geekway.com" + result.HeaderPhoto.url);
    })
  }

  ngOnDestroy() {
    if (this.blogPostSubscription) {
      this.blogPostSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    var el = document.querySelector('app-blogpost')?.shadowRoot.querySelector('.iframely-embed iframe');
    iframely.iframely.load(el);
  }

}
