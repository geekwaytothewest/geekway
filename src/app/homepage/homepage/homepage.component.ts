import { Component, OnInit } from '@angular/core';
import { Convention, NextGeekwayToTheWestGQL } from '../../../generated/types.graphql-gen'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  geekwayToTheWest: Observable<Convention>
  
  constructor(private nextGeekwayToTheWestGQL: NextGeekwayToTheWestGQL) { 
  }

  ngOnInit() {
    this.geekwayToTheWest = this.nextGeekwayToTheWestGQL.watch({
      currentDateTime: new Date()
    })
      .valueChanges
      .pipe(
        map(result => result.data.conventions)
      )[0];

      console.log(this.geekwayToTheWest);
  }

}
