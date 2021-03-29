import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { IonicModule } from '@ionic/angular';

import { ProgrammeJourneePage } from './programme-journee.page';

const routes: Routes = [
  {
    path: '',
    component: ProgrammeJourneePage
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
  declarations: [ProgrammeJourneePage]
})
export class ProgrammeJourneePageModule { }
