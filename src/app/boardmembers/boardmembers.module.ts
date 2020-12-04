import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardmembersComponent } from './boardmembers.component';
import { Routes, RouterModule } from '@angular/router';

const boardMembersRoutes: Routes = [
  { path: '', component: BoardmembersComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [BoardmembersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(boardMembersRoutes)
  ]
})
export class BoardmembersModule { }
