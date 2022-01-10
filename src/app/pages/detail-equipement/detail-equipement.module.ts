import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailEquipementPage } from './detail-equipement.page';
import { AffecterEquipementPage } from '../affecter-equipement/affecter-equipement.page'
import { ListDestinataireEquipementPage } from '../list-destinataire-equipement/list-destinataire-equipement.page'
const routes: Routes = [
  {
    path: '',
    component: DetailEquipementPage
  }
];

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailEquipementPage, ListDestinataireEquipementPage, AffecterEquipementPage],
  entryComponents: [AffecterEquipementPage, ListDestinataireEquipementPage],
  exports: [AffecterEquipementPage, ListDestinataireEquipementPage]

})
export class DetailEquipementPageModule { }
