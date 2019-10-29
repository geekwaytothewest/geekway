import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormControl } from '@angular/forms';

const libraryUrl: string = "/assets/xml/geekwaycollection.xml";
const requestOptions: Object = { responseType: 'text' };

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  libraryXml: String;
  libraryJson: String;
  libraryData: any;
  libraryDataObservable: Observable<any>;  
  dataSource: any;
  columnsToDisplay = ['Image', 'Name'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  nameFilter = new FormControl();

  filterValues = {
    name: ''
  };

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<String>(libraryUrl, requestOptions).subscribe(
      xml => {
        this.libraryXml = xml;

        this.libraryDataObservable = new Observable<object>(observer => {
      
          let parser = new xml2js.Parser();
  
          parser.parseStringPromise(this.libraryXml).then((result) => {
            console.log(result.items.item);
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
      }
    );

    this.nameFilter.valueChanges.subscribe(name => {
      this.filterValues.name = name;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }

  tableFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name[0]._.toLowerCase().indexOf(searchTerms.name) !== -1
    }
    return filterFunction;
  } 

}
