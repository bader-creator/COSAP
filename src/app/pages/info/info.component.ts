import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController, Platform, MenuController, AlertController } from '@ionic/angular';
import { RestapiService } from 'src/app/services/restapi.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  env = environment.pathavatar;
  iduser;
  currentUserId;
  date;
  EventsID = []


  constructor(
    public menuCtrl: MenuController,
    private modalController: ModalController,
    private nav: NavController,
    private api: RestapiService,
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.menuCtrl.enable(true);
    this.platform.backButton.subscribe(() => {
      this.closeModal();
    });

  }


  onPressUp(date, personnel) {
    this.api.taskShortCut = { "date": date[1], "personnel": personnel }
    console.log("navigate", date[1], personnel);
    this.nav.navigateRoot(`/add-task`);
    this.modalController.dismiss();
  }



  onPressUpConge(date) {
    this.api.congeDate = date[1];
    this.nav.navigateRoot(`/listdemande`);
    this.modalController.dismiss();
  }




  closeModal() { this.modalController.dismiss(); }
  ngOnInit() {
    console.log("user_presence", this.iduser);
    console.log('EventsID', this.EventsID)

  }







  async Quitter(currentUserId, idevenement) {
    const alert = await this.alertController.create({
      header: 'Vous souhaitez quitter a cette réunion ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            let param = { "idEvent": idevenement, "idUser": currentUserId };
            console.log('param', param)
            this.api.quitterEvent(param)
            this.modalController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }




  async Participer(currentUserId, idevenement) {
    const alert = await this.alertController.create({
      header: 'Vous souhaitez participer a cette réunion ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            let event = { "idEvent": idevenement, "idUser": currentUserId };
            console.log('event', event)
            this.api.ParticiperEvent(event)
            this.modalController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  ajouterEvent(currentUserId, index, state) {
    let date = moment.tz("Africa/Tunis").add(index, 'days');
    let dep = { "debut": date, "fin": date, "nom": "Déplacement", "lieu": null, "description": null, "type": "En déplacement", "personnels": [currentUserId] }
    let reu = { "debut": date, "fin": date, "nom": "Réunion", "lieu": null, "description": null, "type": "En réunion", "personnels": [currentUserId] }


    if (state) {
      this.api.ajouterEvent(dep)
    } else {
      this.api.ajouterEvent(reu)
    }
    this.modalController.dismiss();
  }





}
