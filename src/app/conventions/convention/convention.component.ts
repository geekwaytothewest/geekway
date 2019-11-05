import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Convention, NextConventionWhereGQL } from 'src/generated/types.graphql-gen';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HeaderPhotoService } from 'src/app/shared/header-photo/header-photo.service';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.scss']
})
export class ConventionComponent implements OnInit {

  convention: Observable<Convention>;
  conventionSubscription: Subscription; 
  playAndWinDataSource: MatTableDataSource<any>;
  todaysDate = Date();
  paginator: MatPaginator;
  sort: MatSort;

  @ViewChild(MatSort, {static: false}) set matSort(ms: MatSort) {
    this.sort = ms;

    if (this.playAndWinDataSource) {
      this.playAndWinDataSource.sort = this.sort;
    }
  }

  @ViewChild(MatPaginator, {static: false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;

    if (this.playAndWinDataSource) {
      this.playAndWinDataSource.paginator = this.paginator;
    }
  }
  
  columnsToDisplay = ['Image', 'Name'];

  nameFilter = new FormControl();

  filterValues = {
    name: '',
  };

  constructor(
    private nextGWConventionWhere: NextConventionWhereGQL,
    private router: Router,    
    private route: ActivatedRoute,
    private headerPhotos: HeaderPhotoService
  ) { }

  ngOnInit() {

    this.convention = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {        
        let whereClauseGW = {
          "_id": params.get('id')
        };

        return this.nextGWConventionWhere.watch({whereClause: whereClauseGW})
          .valueChanges
          .pipe(        
            map(result => result.data.conventions[0])
          );
      })
    );

    this.conventionSubscription = this.convention.subscribe(data => {
      this.playAndWinDataSource = new MatTableDataSource();
      this.playAndWinDataSource.data = data.playAndWins;
      this.playAndWinDataSource.sort = this.sort
      this.playAndWinDataSource.paginator = this.paginator;
      this.playAndWinDataSource.filterPredicate = this.tableFilter();
    })

    this.nameFilter.valueChanges.subscribe(name => {
      this.filterValues.name = name;
      this.playAndWinDataSource.filter = JSON.stringify(this.filterValues);
    })

    this.headerPhotos.announceHeaderLabelChanged(null);
    this.headerPhotos.announceHeaderPhotoChanged(null);
  }

  ngOnDestroy() {
    this.conventionSubscription.unsubscribe();
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

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);

      let nameFound = data.Name.toLowerCase().indexOf(searchTerms.name) !== -1;

      return nameFound;
    }
    
    return filterFunction;
  }

  playAndWinPaginateChange(event: any) {
    document.getElementById('playAndWinCard').scrollIntoView();
  }

  bggRedirect(bggId: String) {
    window.open("https://boardgamegeek.com/boardgame/" + bggId, '_blank');
  }

}
