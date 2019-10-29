import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { Routes, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

const eventsRoutes: Routes = [  
  { path: '', component: EventsComponent, pathMatch: 'full' },
  { path: 'event/:slug', component: EventComponent }
]

@NgModule({
  declarations: [EventComponent, EventsComponent],
  imports: [
    CommonModule,
    MarkdownModule,
    RouterModule.forChild(eventsRoutes)
  ]
})
export class EventsModule { }
