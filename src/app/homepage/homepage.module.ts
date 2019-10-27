import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

const homepageRoutes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homepageRoutes)
  ]
})
export class HomepageModule { }
