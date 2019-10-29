import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesComponent } from './policies/policies.component';
import { PolicyComponent } from './policy/policy.component';



@NgModule({
  declarations: [PoliciesComponent, PolicyComponent],
  imports: [
    CommonModule
  ]
})
export class PoliciesModule { }
