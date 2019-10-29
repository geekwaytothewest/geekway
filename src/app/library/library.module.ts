import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { Routes, RouterModule } from '@angular/router';

const libraryRoutes: Routes = [
  { path: '', component: LibraryComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [LibraryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(libraryRoutes)
  ]
})
export class LibraryModule { }
