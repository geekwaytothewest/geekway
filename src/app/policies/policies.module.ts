import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesComponent } from './policies/policies.component';
import { PolicyComponent } from './policy/policy.component';
import { Routes, RouterModule } from '@angular/router';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

const policiesRoutes: Routes = [
  { path: '', component: PoliciesComponent, pathMatch: 'full' },
  { path: 'policy/:slug', component: PolicyComponent }
];

@NgModule({
  declarations: [PoliciesComponent, PolicyComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(policiesRoutes)
  ]
})
export class PoliciesModule { }
