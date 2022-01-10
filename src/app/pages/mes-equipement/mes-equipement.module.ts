import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MesEquipementPage } from './mes-equipement.page';

const routes: Routes = [
  {
    path: '',
    component: MesEquipementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MesEquipementPage]
})
export class MesEquipementPageModule {}
