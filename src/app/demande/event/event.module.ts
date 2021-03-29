import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EventPage } from './event.page';
import { VerifieDisponibilitePage } from 'src/app/pages/verifie-disponibilite/verifie-disponibilite.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EventPage, VerifieDisponibilitePage],
  entryComponents: [VerifieDisponibilitePage],
})
export class EventPageModule { }
