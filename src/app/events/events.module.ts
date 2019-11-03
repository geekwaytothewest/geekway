import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material';
import { IgxCarouselModule } from 'igniteui-angular';

const eventsRoutes: Routes = [  
  { path: '', component: EventsComponent, pathMatch: 'full' },
  { path: 'event/:slug', component: EventComponent }
]

@NgModule({
  declarations: [EventComponent, EventsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    IgxCarouselModule,
    RouterModule.forChild(eventsRoutes)
  ]
})
export class EventsModule { }
