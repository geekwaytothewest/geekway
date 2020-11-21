import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';

const pagesRoutes: Routes = [
  { path: '', component: PageComponent }
];

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(pagesRoutes)
  ]
})
export class PagesModule { }
