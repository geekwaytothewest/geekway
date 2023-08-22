import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import * as moment from 'moment-timezone';
import * as FlipClock from 'flipclock';

@Component({
  selector: 'app-flipclock',
  templateUrl: './flipclock.component.html',
  styleUrls: ['./flipclock.component.scss']
})
export class FlipclockComponent implements OnInit, AfterViewChecked {

  @Input() date: Date | string;
  @Input() id: string;

  rendered = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (!this.rendered) {
      let countdownDate: Date;

      if (typeof this.date === 'string') {
        countdownDate = new Date(this.date);
      } else {
        countdownDate = this.date;
      }

      const el = document.querySelector('#' + this.id);

      const clock = new FlipClock(el, countdownDate, {
        face: 'DayCounter',
        countdown: true
      });

      this.rendered = true;
    }

  }
}
