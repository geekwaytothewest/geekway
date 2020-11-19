import { AfterViewChecked, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Blogpost, SingleBlogPostGQL } from 'src/generated/types.graphql-gen';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import iframely from '@iframely/embed.js';
import { switchMap, map } from 'rxjs/operators';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';

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
  
  constructor(
    private route: ActivatedRoute,
    private singlePostGQL: SingleBlogPostGQL,
    private sanitizer: DomSanitizer,
    private headerPhotos: HeaderPhotoService
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
      this.blogContent = this.sanitizer.bypassSecurityTrustHtml(result.content.replace(/<oembed url=(.*)><\/oembed>/, ' <div class="iframely-embed"><div class="iframely-responsive"><a data-iframely-url href=$1></div></div>').replace('src="/uploads/', 'src="https://cms.geekway.com/uploads/'));
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
    iframely.iframely.load();
  }

}
