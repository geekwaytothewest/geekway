import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { FlipclockComponent } from '../shared/flipclock/flipclock.component';

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
    RouterModule.forChild(homepageRoutes)
  ]
})
export class HomepageModule { }
