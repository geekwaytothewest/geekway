import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Convention } from 'src/app/services/api.types';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  geekwayToTheWest: Convention;
  geekwayMini: Convention;
  geekwayMicro: Convention;

  constructor(svc: ApiService) { 
    svc
      .loadNextGeekwayToTheWest()
      .subscribe(convention => {
        this.geekwayToTheWest = convention[0];
      });
      
    svc
      .loadNextGeekwayMini()
      .subscribe(convention => {
        this.geekwayMini = convention[0];
      });
      
    svc
      .loadNextGeekwayMicro()
      .subscribe(convention => {
        this.geekwayMicro = convention[0];
      });
  }

  ngOnInit() {
  }

}
