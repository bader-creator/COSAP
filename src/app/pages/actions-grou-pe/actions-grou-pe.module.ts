import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import {HistroiqueActionPageModule} from '../histroique-action/histroique-action.module';

import { ActionsGrouPePage } from './actions-grou-pe.page';
const routes: Routes = [
  {
    path: '',
    component: ActionsGrouPePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HistroiqueActionPageModule,  
  ],
  declarations: [ActionsGrouPePage]
})
export class ActionsGrouPePageModule {}
