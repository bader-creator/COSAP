import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { IonicModule } from '@ionic/angular';

import { ListReunionPage } from './list-reunion.page';
import {PresenceReunionPageModule} from '../presence-reunion/presence-reunion.module';

const routes: Routes = [
  {
    path: '',
    component: ListReunionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PresenceReunionPageModule,
    SuperTabsModule
  ],
  declarations: [ListReunionPage],
 
})
export class ListReunionPageModule {}
