import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipclockComponent } from './flipclock.component';

@NgModule({
  declarations: [FlipclockComponent],
  imports: [
    CommonModule
  ],
  exports: [
    FlipclockComponent
  ]
})
export class FlipclockModule { }
