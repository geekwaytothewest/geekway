import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatSortModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { MomentTimezoneModule } from '../shared/moment-timezone/moment-timezone.module';

const libraryRoutes: Routes = [
  { path: '', component: LibraryComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [LibraryComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MomentModule,
    MomentTimezoneModule,
    RouterModule.forChild(libraryRoutes)
  ]
})
export class LibraryModule { }
