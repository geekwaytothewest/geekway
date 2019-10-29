import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { FlipclockComponent } from '../shared/flipclock/flipclock.component';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module'

const homepageRoutes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    HomepageComponent,
    FlipclockComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MomentModule,
    MomentTimezoneModule,
    RouterModule.forChild(homepageRoutes)
  ]
})
export class HomepageModule { }
