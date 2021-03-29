import { Component, OnInit } from '@angular/core';
import { RestapiService } from 'src/app/services/restapi.service';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, Platform, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
@Component({
  selector: 'app-modifier-event',
  templateUrl: './modifier-event.page.html',
  styleUrls: ['./modifier-event.page.scss'],
})
export class ModifierEventPage implements OnInit {

  alertPresented
  constructor(public activatedRoute: ActivatedRoute, public localNotifications: LocalNotifications, public Platform: Platform, public alertController: AlertController, public api: RestapiService, public storage: Storage, public toastController: ToastController, public nav: NavController) {
    this.alertPresented = false
    this.Platform.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.NotifAlert(res.title, res.text, msg);
      })
    })
  }

  idEvent
  id_event
  currentUser
  datetime
  salles = []
  typeEvents = ["En déplacement", "En réunion", "Événement", "Comex"]
  event = {
    "debut": new Date().toISOString(),
    "fin": new Date().toISOString(),
    "nom": "",
    "users": null,
    "lieu": "",
    "salle": null,
    "timedebut": "08:00",
    "timefin": "08:00",
    "description": "",
    "type": "En déplacement",
    "personnels": [],
    "participantReun": [],
    "participantDepla": [],
    "DeplcaementAnc": [],
    "ReunionAnc": [],
    "participantStaff": [],
    "participantStagiaire": [],
    "participantGuest": [],
    "participantCameroun": [],
    'createur': null
  }


  ngOnInit() {
    this.id_event = this.activatedRoute.snapshot.paramMap.get('idevent');
    console.log("idevent", this.id_event)
    this.event.fin = this.event.debut
    this.getevent();
    this.get_salles()
    this.getProprietaire()
  }

  getevent() {
    this.api.get_event(this.id_event).then(d => {
      let data = JSON.parse(d.data);
      console.log("data", data.event[0])
      this.event = data.event[0]
      this.event.salle = this.event.salle.id;
      this.event.timedebut = this.event.debut.substr(11, 16);
      console.log(this.event.timedebut);
      this.event.timefin = this.event.fin.substr(11, 16);
      console.log(this.event.timefin);
      this.event.participantStagiaire = [];
      this.event.participantCameroun = [];
      this.event.participantStaff = [];
      this.event.participantGuest = [];
      let DeplcaementAnc = []
      let ReunionAnc = []
      if (this.event.type == "En déplacement") {
        data.event[0].deplacement.forEach(element => {
          console.log('element', element)
          console.log('element.user.id', element.user.id)

          DeplcaementAnc = DeplcaementAnc.concat(element.user.id)
          this.event.DeplcaementAnc = DeplcaementAnc
        });
      } else {
        data.event[0].reunion.forEach(element => {
          ReunionAnc = ReunionAnc.concat(element.user.id)
          this.event.ReunionAnc = ReunionAnc
        });
      }
      console.log('DeplcaementAnc', this.event.DeplcaementAnc)
      console.log('ReunionAnc', this.event.ReunionAnc)
    })
  }

  stagiaires
  guest
  cameroun
  proprietaires = []
  getProprietaire() {
    this.api.getProprietaire().then(d => {
      let data = JSON.parse(d.data);
      this.proprietaires = data.proprietaire;
      this.stagiaires = data.stagiaires;
      this.cameroun = data.cameroun;
      this.guest = data.guest;
    })
  }

  get_salles() {
    this.api.getSalles().then(res => {
      let data = JSON.parse(res.data)
      console.log(data.salle)
      this.salles = data.salle;
    })
  }

  UpdateMyDate() {
    this.event.fin = (new Date(this.event.debut).getUTCFullYear() + "-" + (new Date(this.event.debut).getMonth() + 1) + "-" + (new Date(this.event.debut).getDate())).toString();
  }

  ModifierEvenement() {

    this.event.fin = (new Date(this.event.fin).getUTCFullYear() + "-" + (new Date(this.event.fin).getMonth() + 1) + "-" + new Date(this.event.fin).getDate() + " " + this.event.timefin).toString();
    this.event.debut = (new Date(this.event.fin).getUTCFullYear() + "-" + (new Date(this.event.debut).getMonth() + 1) + "-" + new Date(this.event.debut).getDate() + " " + this.event.timedebut).toString();
    if (this.event.type == "Comex") {
      this.api.teamEvent(this.event);
    }
    else {
      if (this.event.type == "En réunion") {
        this.event.participantReun = this.event.participantCameroun.concat(this.event.participantGuest).concat(this.event.participantStaff).concat(this.event.participantStagiaire);
      }
      if (this.event.type == "En déplacement") {
        this.event.participantDepla = this.event.participantCameroun.concat(this.event.participantGuest).concat(this.event.participantStaff).concat(this.event.participantStagiaire);
      }
      console.log("participantReunion", this.event.participantReun)
      console.log("ReunionAnc", this.event.ReunionAnc)
      console.log("participantDeplacement", this.event.participantDepla)
      console.log("DeplcaementAnc", this.event.DeplcaementAnc)
      this.api.modifiEvent(this.event, this.id_event);

    }

  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  personnels = [];
  onDateDebutChanged() {
    this.event.fin = this.event.debut;
  }
  onDateFinChanged() {
  }

  ShowNotifReunion() {
    this.datetime = (new Date(this.event.fin).getUTCFullYear() + "-" + (new Date(this.event.fin).getMonth() + 1) + "-" + new Date(this.event.fin).getDate() + " " + this.event.timefin).toString();
    if (this.event.type == "En réunion") {
      this.localNotifications.schedule({
        id: 1,
        title: 'Attention',
        text: 'Delayed ILocalNotification',
        trigger: { at: new Date(this.event.fin) },
        data: { mydata: 'My hidden message ' },
      });
    }
  }

  async NotifAlert(header, sub, msg) {
    if (!this.alertPresented) {
      this.alertPresented = true;
      const alert = await this.alertController.create({
        header: header,
        subHeader: sub,
        message: msg,
        buttons: [
          {
            text: 'Non clôturé',
            handler: () => {
              this.idEvent = this.api.idEvent;
              this.nav.navigateRoot(`/modifier-event/` + this.idEvent);
              this.api.NoteEventNOnColture(this.idEvent);
            }
          },
          {
            text: 'Clôturé',
            handler: () => {
              this.idEvent = this.api.idEvent;
              this.api.NoteEventColture(this.idEvent);
            }
          }
        ]

      })
      await alert.present();
    }


  }

}
