import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { Routes, RouterModule } from '@angular/router';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';
import { MomentModule } from 'ngx-moment';

const blogRoutes: Routes = [  
  { path: '', component: BlogsComponent, pathMatch: 'full' },
  { path: 'post/:slug', component: BlogpostComponent }
]

@NgModule({
  declarations: [BlogsComponent, BlogpostComponent],
  imports: [
    CommonModule,
    MomentModule,
    MomentTimezoneModule,
    RouterModule.forChild(blogRoutes)
  ]
})
export class BlogsModule { }
