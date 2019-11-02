import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Newspost, NewsGQL } from 'src/generated/types.graphql-gen';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news: Observable<Newspost[]>;
  newsSubscription: Subscription;
  todaysDate = Date();

  constructor(
    private newsGQL: NewsGQL,
    private router: Router
  ) { }

  ngOnInit() {
    this.news = this.newsGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.newsposts)
      );

    this.newsSubscription = this.news.subscribe();
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
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
