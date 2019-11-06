import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesComponent } from './policies/policies.component';
import { PolicyComponent } from './policy/policy.component';
import { Routes, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { MatCardModule } from '@angular/material';

const policiesRoutes: Routes = [  
  { path: '', component: PoliciesComponent, pathMatch: 'full' },
  { path: 'policy/:slug', component: PolicyComponent }
]

@NgModule({
  declarations: [PoliciesComponent, PolicyComponent],
  imports: [
    CommonModule,
    MarkdownModule,
    MatCardModule,
    RouterModule.forChild(policiesRoutes)
  ]
})
export class PoliciesModule { }
