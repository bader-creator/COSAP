import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsortieConfirmationPage } from './detailsortie-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsortieConfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailsortieConfirmationPage]
})
export class DetailsortieConfirmationPageModule {}
