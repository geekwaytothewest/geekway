import { Component, OnInit, Input } from '@angular/core';
import { count } from 'rxjs/operators';
declare var FlipClock: any;

@Component({
  selector: 'app-flipclock',
  templateUrl: './flipclock.component.html',
  styleUrls: ['./flipclock.component.scss']
})
export class FlipclockComponent implements OnInit {

  @Input() date: Date | string;

  constructor() { }

  ngOnInit() {
    var countdownDate: Date;

    if (typeof this.date === "string") {
      countdownDate = new Date(this.date);
    } else {
      countdownDate = this.date;
    }

    const el = document.querySelector('.countdown');

    const clock = new FlipClock(el, countdownDate, {
      face: 'DayCounter',
      countdown: true
    });
  }

}
