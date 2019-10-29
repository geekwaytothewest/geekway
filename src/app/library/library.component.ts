import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import xml2js from 'xml2js';

const libraryUrl: string = "/assets/xml/geekwaycollection.xml";
const requestOptions: Object = { responseType: 'text' };

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  libraryXml: String;
  libraryData: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<String>(libraryUrl, requestOptions).subscribe(
      xml => {
        this.libraryXml = xml;

        this.parseXML(this.libraryXml).then(data => this.libraryData = data)
      }
    );
  }

  parseXML(data) {  
    return new Promise(resolve => {  
      var k: string | number,  
        arr = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true  
          });  
      parser.parseString(data, function (err, result) {  
        var obj = result.Employee;  
        for (k in obj.emp) {  
          var item = obj.emp[k];  
          arr.push({  
            id: item.id[0],  
            name: item.name[0],  
            gender: item.gender[0],  
            mobile: item.mobile[0]  
          });  
        }  
        resolve(arr);  
      });  
    });  
  }  

}
