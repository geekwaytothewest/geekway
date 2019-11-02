import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Blogpost, BlogsGQL } from 'src/generated/types.graphql-gen';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  blogs: Observable<Blogpost[]>;
  blogsSubscription: Subscription;
  todaysDate = Date();

  constructor(
    private blogsGQL: BlogsGQL,
    private router: Router
  ) { }

  ngOnInit() {
    this.blogs = this.blogsGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.blogposts)
      );

    this.blogsSubscription = this.blogs.subscribe();
  }

  ngOnDestroy() {
    this.blogsSubscription.unsubscribe();
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
