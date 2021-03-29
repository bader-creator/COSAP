import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { PresenceReunionPage } from '../presence-reunion/presence-reunion.page'
import { RestapiService } from '../../services/restapi.service';
import { AppComponent } from '../../app.component';
import * as moment from 'moment/moment.js';
@Component({
  selector: 'app-list-reunion',
  templateUrl: './list-reunion.page.html',
  styleUrls: ['./list-reunion.page.scss'],
})
export class ListReunionPage implements OnInit {
  currentUser
  notif
  mycolor: String = '#F9FAFC';
  segment = "reunion";
  constructor(private storage: Storage, private api: RestapiService, private alertCtrl: AlertController, private nav: NavController, private modalctrl: ModalController, private app: AppComponent) { }

  ngOnInit() {
    console.log('notif', this.notif)
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      console.log('this.currentsssUser', this.currentUser);
      this.ListEvenement(this.currentUser);


    });
  }

  idenabled
  isenabled
  changeState(id) {
    this.idenabled = id;
    this.isenabled = !this.isenabled;
    console.log("isenable", this.isenabled)
    console.log('id', this.idenabled)
  }

  ViewIcon: string = 'eye-off';
  hideShow() {
    this.ViewIcon = this.ViewIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  Event
  ListEvenement(iduser) {
    this.api.ReunionInvite(iduser).then(d => {
      let data = JSON.parse(d.data);
      this.Event = data.event;
      console.log('Event', this.Event);

    })
  }

  async AlertSupperssion(idEvent) {
    let alert = await this.alertCtrl.create({
      message: 'Voulez vous vraiment supprimer cette événement?',
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
            this.DeleteEvent(idEvent)
          }
        }
      ]
    });
    await alert.present();
  }

  DeleteEvent(idEvent) {
    this.api.loadingFn()
    this.api.DeleteEvent(idEvent).then(d => {
      this.ListEvenement(this.currentUser);
      this.api.dismissFn()
      this.api.presentToast("Opération effectuée");

    }).catch((error) => {
      this.api.dismissFn()
      this.api.presentToast("Erreur");
      console.log(error.status);
    });

  }

  doRefresh(event) {
    console.log('refresh')
    this.ListEvenement(this.currentUser);
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }
  Modifier(idevent) {
    this.nav.navigateRoot(`/modifier-event/` + idevent);
    console.log("idevenement", idevent)
  }

  async GoesTOListePresence(idReunion, type) {
    const modal = await this.modalctrl.create({
      component: PresenceReunionPage,
      componentProps: {
        idReunion: idReunion,
        type: type
      }
    })
    modal.present();
  }








}
