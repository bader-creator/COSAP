import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { RestapiService } from '../../services/restapi.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-presence-reunion',
  templateUrl: './presence-reunion.page.html',
  styleUrls: ['./presence-reunion.page.scss'],
})
export class PresenceReunionPage implements OnInit {
  env = environment.pathavatar;
  currentUser
  constructor(private modalctrl: ModalController, private alertCtrl: AlertController, private api: RestapiService, private storage: Storage) { }

  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      console.log("currentUser", this.currentUser)

    });
  }

  close() {
    this.modalctrl.dismiss()
  }

  ListParticipant(idreunion, type) {
    this.api.ListParticipant(idreunion, type).then(d => {
      let data = JSON.parse(d.data);
      this.Participant = data.ListParticipant;
      console.log('particicpant', this.Participant);
    })
  }
  id
  idReunion
  typeEvent
  type
  Participant
  ionViewWillEnter() {
    this.id = this.idReunion;
    this.typeEvent = this.type;
    console.log('this.id', this.id);
    console.log('this.typeEvent', this.typeEvent);
    this.ListParticipant(this.id, this.typeEvent);
  }

  AbsenceRenion() {
    let Renion = { "renion": this.id, "iduser": this.currentUser, "type": this.typeEvent }
    this.api.AbsenceRenion(Renion);
    setTimeout(() => {
      this.ListParticipant(this.id, this.typeEvent);
    }, 2000);
  }

  PresenceRenion() {
    let Renion = { "renion": this.id, "iduser": this.currentUser, "type": this.typeEvent }
    this.api.PresenceRenion(Renion);
    setTimeout(() => {
      this.ListParticipant(this.id, this.typeEvent);
    }, 2000);

  }

  DeleteParticipant(id) {
    this.api.DeleteParticipant(id, this.typeEvent).then(d => {
      this.ListParticipant(this.id, this.typeEvent);
      this.api.dismissFn()
      this.api.presentToast("Opération effectuée");
    }).catch((error) => {
      this.api.dismissFn()
      this.api.presentToast("Erreur");
      console.log(error.status);
    });

  }

  async AlertSupperssion(id) {
    let alert = await this.alertCtrl.create({
      message: 'Voulez vous vraiment supprimer ce participant?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'oui',
          handler: () => {
            this.DeleteParticipant(id)
          }
        }
      ]
    });
    await alert.present();
  }


}
