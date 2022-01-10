import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditerEquipementPage } from './editer-equipement.page';

const routes: Routes = [
  {
    path: '',
    component: EditerEquipementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditerEquipementPage]
})
export class EditerEquipementPageModule {}
