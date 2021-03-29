import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { ListeDocumentsPage } from './liste-documents.page';

const routes: Routes = [
  {
    path: '',
    component: ListeDocumentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SuperTabsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListeDocumentsPage]
})
export class ListeDocumentsPageModule {}
