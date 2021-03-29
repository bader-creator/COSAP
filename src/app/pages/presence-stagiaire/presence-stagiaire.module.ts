import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PresenceStagiairePage } from './presence-stagiaire.page';

const routes: Routes = [
  {
    path: '',
    component: PresenceStagiairePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PresenceStagiairePage]
})
export class PresenceStagiairePageModule {}
