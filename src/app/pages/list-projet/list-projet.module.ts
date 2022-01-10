import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { IonicModule } from '@ionic/angular';

import { ListProjetPage } from './list-projet.page';

const routes: Routes = [
  {
    path: '',
    component: ListProjetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SuperTabsModule
  ],
  declarations: [ListProjetPage]
})
export class ListProjetPageModule {}
