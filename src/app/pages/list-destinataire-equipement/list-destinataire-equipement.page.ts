import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-destinataire-equipement',
  templateUrl: './list-destinataire-equipement.page.html',
  styleUrls: ['./list-destinataire-equipement.page.scss'],
})
export class ListDestinataireEquipementPage implements OnInit {
  env = environment.pathavatar;
  constructor(private modalController: ModalController) { }
  tracibilte = []
  destinataire = []
  ngOnInit() {
    this.tracibilte = this.tracibilte
    this.tracibilte.forEach(element => {
      if (element.destinataire)
        this.destinataire.push(element.destinataire)
      console.log('destinataire', this.destinataire)
    });
    console.log('tracibilte', this.tracibilte)
    console.log('destinataire', this.destinataire)
  }
  onDismiss() {
    this.modalController.dismiss();
  }

}
