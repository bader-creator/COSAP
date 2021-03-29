import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistroiqueActionPage } from './histroique-action.page';

const routes: Routes = [
  {
    path: '',
    component: HistroiqueActionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [HistroiqueActionPage],
  entryComponents: [HistroiqueActionPage]
})
export class HistroiqueActionPageModule {}
