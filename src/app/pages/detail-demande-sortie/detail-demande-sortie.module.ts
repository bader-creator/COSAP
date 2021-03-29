import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailDemandeSortiePage } from './detail-demande-sortie.page';

const routes: Routes = [
  {
    path: '',
    component: DetailDemandeSortiePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailDemandeSortiePage]
})
export class DetailDemandeSortiePageModule {}
