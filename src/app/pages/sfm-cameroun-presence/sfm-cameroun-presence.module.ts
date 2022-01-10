import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SfmCamerounPresencePage } from './sfm-cameroun-presence.page';

const routes: Routes = [
  {
    path: '',
    component: SfmCamerounPresencePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SfmCamerounPresencePage]
})
export class SfmCamerounPresencePageModule {}
