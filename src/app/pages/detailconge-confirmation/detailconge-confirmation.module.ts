import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailcongeConfirmationPage } from './detailconge-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: DetailcongeConfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailcongeConfirmationPage]
})
export class DetailcongeConfirmationPageModule {}
