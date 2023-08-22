import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { Routes, RouterModule } from '@angular/router';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

const eventsRoutes: Routes = [
  { path: '', component: EventsComponent, pathMatch: 'full' },
  { path: 'event/:slug', component: EventComponent }
];

@NgModule({
  declarations: [EventComponent, EventsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(eventsRoutes)
  ]
})
export class EventsModule { }
