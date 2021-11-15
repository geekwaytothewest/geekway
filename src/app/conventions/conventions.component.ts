import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, ConventionsGQL } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HeaderPhotoService } from '../shared/header-photo/header-photo.service';
import moment from 'moment';

@Component({
  selector: 'app-conventions',
  templateUrl: './conventions.component.html',
  styleUrls: ['./conventions.component.scss']
})
export class ConventionsComponent implements OnInit, OnDestroy {

  conventions: Observable<Convention[]>;
  conventionsSubscription: Subscription;
  todaysDate = new Date();

  columnsToDisplay = ['Type', 'Annual', 'Theme', 'Dates', 'Location', 'Size', 'Status'];

  constructor(
    private conventionsGQL: ConventionsGQL,
    private router: Router,
    private headerPhoto: HeaderPhotoService
  ) { }

  ngOnInit() {
    this.conventions = this.conventionsGQL.watch()
      .valueChanges
      .pipe(
        map(result => result.data.conventions)
      );

    this.conventionsSubscription = this.conventions.subscribe();

    this.headerPhoto.announceHeaderLabelChanged('Conventions - Past, Present, and Future');
    this.headerPhoto.announceHeaderPhotoChanged('/assets/images/conventioncenter.png');
  }

  ngOnDestroy() {
    if (this.conventionsSubscription) {
      this.conventionsSubscription.unsubscribe();
    }
  }

  redirectConvention(id: string) {
    this.router.navigate(['conventions/convention/' + id]);

    event.preventDefault();
  }

  redirect(url: string) {
    if (url.startsWith('http')) {
      this.router.navigate(['/externalRedirect', { externalUrl: url }], {
        skipLocationChange: true,
      });
    } else {
      this.router.navigate([url]);
    }

    event.preventDefault();
  }

  isRegistrationSoon(reg) {
    return moment(reg.date).isAfter(moment(this.todaysDate));
  }

}
