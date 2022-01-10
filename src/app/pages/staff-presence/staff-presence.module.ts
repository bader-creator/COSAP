import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StaffPresencePage } from './staff-presence.page';

const routes: Routes = [
  {
    path: '',
    component: StaffPresencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StaffPresencePage]
})
export class StaffPresencePageModule {}
