import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConventionsComponent } from './conventions.component';
import { MatTableModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';
import { ConventionComponent } from './convention/convention.component';
import { GeekwaytothewestComponent } from './geekwaytothewest/geekwaytothewest.component';
import { GeekwaymicroComponent } from './geekwaymicro/geekwaymicro.component';
import { GeekwayminiComponent } from './geekwaymini/geekwaymini.component';
import { FlipclockModule } from '../shared/flipclock/flipclock.module';
import { IgxCarouselModule, IgxSliderModule, IgxProgressBarModule } from 'igniteui-angular';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

const conventionsRoutes: Routes = [
  { path: '', component: ConventionsComponent, pathMatch: 'full' },
  { path: 'geekway', component: GeekwaytothewestComponent},
  { path: 'mini', component: GeekwayminiComponent},
  { path: 'micro', component: GeekwaymicroComponent},
  { path: 'convention/:slug', component: ConventionComponent }
]

@NgModule({
  declarations: [
    ConventionsComponent, 
    ConventionComponent, 
    GeekwaytothewestComponent, 
    GeekwayminiComponent, 
    GeekwaymicroComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MomentModule,
    MomentTimezoneModule,
    MatCardModule,
    FlipclockModule,
    MatButtonModule,
    IgxCarouselModule,
    IgxProgressBarModule,    
    IgxSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARBVehVJceiD-KIs9vS9YQm1F4XA1RgaI'
    }),
    AgmSnazzyInfoWindowModule,
    RouterModule.forChild(conventionsRoutes)
  ]
})
export class ConventionsModule { }
