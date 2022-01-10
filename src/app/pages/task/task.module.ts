import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EnCopieByDatePage } from '../en-copie-by-date/en-copie-by-date.page'
import { TaskPage } from './task.page';

const routes: Routes = [
  {
    path: '',
    component: TaskPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskPage, EnCopieByDatePage],
  entryComponents: [EnCopieByDatePage],
})
export class TaskPageModule { }
