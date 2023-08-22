import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';
import { MomentModule } from 'ngx-moment';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { FlipclockModule } from '../shared/flipclock/flipclock.module';

const registrationRoutes: Routes = [
  { path: '', component: RegistrationComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    MomentTimezoneModule,
    MomentModule,
    MatCardModule,
    MatButtonModule,
    FlipclockModule,
    RouterModule.forChild(registrationRoutes)
  ]
})
export class RegistrationModule { }
