import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EquipementByGroupPage } from './equipement-by-group.page';

const routes: Routes = [
  {
    path: '',
    component: EquipementByGroupPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EquipementByGroupPage]
})
export class EquipementByGroupPageModule {}
