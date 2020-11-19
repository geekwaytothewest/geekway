import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Newspost, NewsGQL } from 'src/generated/types.graphql-gen';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  news: Observable<Newspost[]>;
  newsSubscription: Subscription;
  todaysDate = Date();

  constructor(
    private newsGQL: NewsGQL,
    private router: Router,
    private headerPhotos: HeaderPhotoService
  ) { }

  ngOnInit() {
    this.news = this.newsGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.newsposts)
      );

    this.newsSubscription = this.news.subscribe();
    this.headerPhotos.announceHeaderLabelChanged("News Posts");
    this.headerPhotos.announceHeaderPhotoChanged("/assets/images/newsletter.png");
  }

  ngOnDestroy() {
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }
  }

  redirect(url: string) {
    console.log(url);
    if (url.startsWith("http")) {
      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
        skipLocationChange: true,
      });
    } else {
      this.router.navigate([url]);
    }
    
    event.preventDefault();
  }

}
