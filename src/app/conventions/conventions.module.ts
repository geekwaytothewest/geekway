import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConventionsComponent } from './conventions.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';
import { ConventionComponent } from './convention/convention.component';
import { GeekwaytothewestComponent } from './geekwaytothewest/geekwaytothewest.component';
import { GeekwaymicroComponent } from './geekwaymicro/geekwaymicro.component';
import { GeekwayminiComponent } from './geekwaymini/geekwaymini.component';
import { FlipclockModule } from '../shared/flipclock/flipclock.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ReactiveFormsModule } from '@angular/forms';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';

const conventionsRoutes: Routes = [
  { path: '', component: ConventionsComponent, pathMatch: 'full' },
  { path: 'geekway', component: GeekwaytothewestComponent},
  { path: 'mini', component: GeekwayminiComponent},
  { path: 'micro', component: GeekwaymicroComponent},
  { path: 'convention/:id', component: ConventionComponent }
];

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
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyARBVehVJceiD-KIs9vS9YQm1F4XA1RgaI'
    }),
    AgmSnazzyInfoWindowModule,
    IvyCarouselModule,
    CrystalLightboxModule,
    RouterModule.forChild(conventionsRoutes)
  ]
})
export class ConventionsModule { }
