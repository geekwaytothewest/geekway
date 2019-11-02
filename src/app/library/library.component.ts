import { Component, OnInit, ViewChild } from '@angular/core';
import xml2js from 'xml2js';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { LibrariesGQL, Library } from 'src/generated/types.graphql-gen';
import { map } from 'rxjs/operators';

const libraryUrl: string = "/assets/xml/geekwaycollection.xml";
const requestOptions: Object = { responseType: 'text' };

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  library: Observable<Library>;
  librarySubscription: Subscription;
  libraryXml: String;
  libraryJson: String;
  libraryData: any;
  libraryDataObservable: Observable<any>;  
  dataSource: any;
  columnsToDisplay = ['Image', 'Name', 'Year', 'Players', 'Playtime', 'Rating'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  nameFilter = new FormControl();
  yearFilter = new FormControl();
  playersFilter = new FormControl();
  playtimeFilter = new FormControl();
  ratingFilter = new FormControl();

  filterValues = {
    name: '',
    year: '',
    players: '',
    playtime: '',
    rating: ''
  };

  constructor(
    private librariesGQL: LibrariesGQL
  ) { }

  ngOnInit() {
    this.library = this.librariesGQL.watch()
      .valueChanges
      .pipe(        
        map(result => result.data.libraries[0])
      );

    this.librarySubscription = this.library.subscribe(library => {
      this.libraryXml = library.BggLibraryXml;

      this.libraryDataObservable = new Observable<object>(observer => {    
        let parser = new xml2js.Parser();
  
        parser.parseStringPromise(this.libraryXml).then((result) => {
          observer.next(result.items.item);                        
          this.libraryData = result.items.item;
          observer.complete();
        });
      });

      this.libraryDataObservable.subscribe(data => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.tableFilter();
      })
    })

    this.nameFilter.valueChanges.subscribe(name => {
      this.filterValues.name = name;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.yearFilter.valueChanges.subscribe(year => {
      this.filterValues.year = year;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.playersFilter.valueChanges.subscribe(players => {
      this.filterValues.players = players;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.playtimeFilter.valueChanges.subscribe(playtime => {
      this.filterValues.playtime = playtime;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })

    this.ratingFilter.valueChanges.subscribe(rating => {
      this.filterValues.rating = rating;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);

      let nameFound = data.name[0]._.toLowerCase().indexOf(searchTerms.name) !== -1;
      let yearFound = data.yearpublished ? data.yearpublished[0].indexOf(searchTerms.year) !== -1 : false;

      let statsObject = data.stats[0].$;

      let players = true;
      let playtime = true;
      let rating = true;

      if (statsObject) {
        if (!isNaN(parseInt(searchTerms.players))) {
          players = parseInt(statsObject.minplayers) <= parseInt(searchTerms.players) && parseInt(statsObject.maxplayers) >= parseInt(searchTerms.players);
        }

        if (!isNaN(parseInt(searchTerms.playtime))) {
          playtime = parseInt(statsObject.minplaytime) <= parseInt(searchTerms.playtime) && parseInt(statsObject.maxplaytime) >= parseInt(searchTerms.playtime);
        }

        if (!isNaN(parseFloat(searchTerms.rating))) {
          rating = parseFloat(data.stats[0].rating[0].average[0].$.value) >= parseFloat(searchTerms.rating);
        }
      }

      return nameFound && yearFound && players && playtime && rating;
    }
    return filterFunction;
  } 

  bggRedirect(bggId: String) {
    window.open("https://boardgamegeek.com/boardgame/" + bggId, '_blank');
  }

  paginateChange(event: any) {
    document.getElementById('libraryDiv').scrollIntoView();
  }

}
