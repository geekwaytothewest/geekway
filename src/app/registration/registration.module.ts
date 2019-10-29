import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';
import { MomentModule } from 'ngx-moment';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { FlipclockComponent } from '../shared/flipclock/flipclock.component';

const registrationRoutes: Routes = [
  { path: '', component: RegistrationComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    RegistrationComponent,  
    FlipclockComponent
  ],
  imports: [
    CommonModule,
    MomentTimezoneModule,
    MomentModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(registrationRoutes)
  ]
})
export class RegistrationModule { }
