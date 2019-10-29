import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { MarkdownModule } from 'ngx-markdown';

const pagesRoutes: Routes = [  
  { path: '', component: PageComponent }
]

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    MarkdownModule,
    RouterModule.forChild(pagesRoutes)
  ]
})
export class PagesModule { }
