import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, ConventionsGQL } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conventions',
  templateUrl: './conventions.component.html',
  styleUrls: ['./conventions.component.scss']
})
export class ConventionsComponent implements OnInit {

  conventions: Observable<Convention[]>;
  conventionsSubscription: Subscription;

  columnsToDisplay = ['Type', 'Annual', 'Theme', 'Dates', 'Location', 'Size']

  constructor(
    private conventionsGQL: ConventionsGQL,
    private router: Router
  ) { }

  ngOnInit() {
    this.conventions = this.conventionsGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.conventions)
      );

    this.conventionsSubscription = this.conventions.subscribe();
  }

  ngOnDestroy() {
    this.conventionsSubscription.unsubscribe();
  }

  redirectConvention(id: string) {
    this.router.navigate(['conventions/convention/' + id]);
    
    event.preventDefault();
  }

}
