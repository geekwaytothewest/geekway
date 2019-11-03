import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private title: Title
  ) {
    this.title.setTitle("Geekway to the West - Four Days of Peace, Love, and Board Games");
 }
}
