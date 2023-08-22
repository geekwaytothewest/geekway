import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewspostComponent } from './newspost/newspost.component';
import { Routes, RouterModule } from '@angular/router';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';

const newsRoutes: Routes = [
  { path: '', component: NewsComponent, pathMatch: 'full' },
  { path: 'post/:slug', component: NewspostComponent }
];

@NgModule({
  declarations: [NewsComponent, NewspostComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MomentModule,
    MomentTimezoneModule,
    RouterModule.forChild(newsRoutes)
  ]
})
export class NewsModule { }
