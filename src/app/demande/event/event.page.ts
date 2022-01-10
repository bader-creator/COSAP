import { Component } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { NavController, ToastController, Platform, LoadingController, AlertController, MenuController, ModalController } from '@ionic/angular';
import { AuthtificationtokenService } from '../../services/authtificationtoken.service';
import { Storage } from '@ionic/storage';
import * as moment from 'moment/moment.js';
import 'moment-timezone';
import { environment } from '../../../environments/environment';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { VerifieDisponibilitePage } from 'src/app/pages/verifie-disponibilite/verifie-disponibilite.page';



@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage {
  env = environment.pathavatar;
  idEvent
  datetime
  "date" = new Date().toISOString();
  event = {
    "debut": moment(new Date()).format('YYYY-MM-DD'),
    "fin":   moment(new Date()).format('YYYY-MM-DD'),
    "timedebut" : "08:00",
    "timefin" : "09:00",
    "nom": "",
    "lieu": "SFM",
    "salle": 1,
    "description": "",
    "type": "En réunion",
    "personnels": [],
    "participantReunion": [],
    "participantDeplacement": [],
    "participantStaff": [],
    "participantStagiaire": [],
    "participantGuest": [],
    "participantCameroun": [],
    "idEvent": null,
    "createur": null,
    "users": ["1"]
  }
  hourValues = ['00','15','30','45'];
  personnels = [];
  typeEvents = ["En déplacement", "En réunion", "Événement", "Comex"]

  currentUser;
  alertPresented
  constructor(public menuCtrl: MenuController,
    private Platform: Platform,
    private nav: NavController,
    private api: RestapiService,
    private authService: AuthtificationtokenService,
    private toastController: ToastController,
    private storage: Storage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private localNotifications: LocalNotifications,
    private modalctrl: ModalController
  ) {
    this.menuCtrl.enable(true);
    //this.event.fin = this.event.debut
    this.api.getSalles().then(res => {
      let data = JSON.parse(res.data)



      this.salles = data.salle;
      console.log('salle', this.salles);
      //  this.event.salle=data.salle[0].id;

    })

    this.alertPresented = false;
    this.Platform.ready().then(() => {

      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      })
    })



  }

  ionViewWillLeave() {
    this.api.dismissFn();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
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
      console.log("proprietaires", this.proprietaires);
    })
  }

  CreeEvenement() {

    this.event.createur = this.currentUser;
    if (this.event.type == "Comex") {
      if (this.event.debut > this.event.fin) {
        this.api.Toast("Merci de bien vouloir vérifier la date de fin", 'danger')

      } else {
        this.api.teamEvent(this.event);
      }
    }
    else {
      console.log('this.event', this.event)
      if (this.event.debut > this.event.fin) {
        this.api.Toast("Merci de bien vouloir vérifier la date de fin", 'danger')

      } else {
        this.api.ajouterEvent(this.event)

      }

    }
  }

  

  async GoesTO(Presences) {
    const modal = await this.modalctrl.create({
      component: VerifieDisponibilitePage,
      cssClass: 'VerifieDisponibilite',
      componentProps: {
        Presences: Presences,
      }
    })
    modal.present();
  }

  onChangeDate(event){
    console.log('event',event)
    this.event.timefin=moment(event,"HH:mm").add(moment.duration("01:00")).format("HH:mm");
    console.log('this.event.timefin',this.event.timefin)
  }

  ShowNotifReunion() {
    if (this.event.type == "En réunion") {
      this.localNotifications.schedule({
        id: 1,
        title: 'Attention',
        text: 'Réunion terminée',
        trigger: { at: new Date(this.event.fin) },
        data: { mydata: 'My hidden message ' },
      });
    }
  }

  Presences
  exist = false
  VerificationDesponiblite() {
    this.api.loadingFn()
    if (this.event.type == "En réunion") {
      this.event.participantReunion = this.event.participantCameroun.concat(this.event.participantGuest).concat(this.event.participantStaff).concat(this.event.participantStagiaire);
      if (!this.event.participantReunion.includes(this.currentUser)) {
        this.event.participantReunion.push(this.currentUser)
        console.log('event.participantReunion', this.event.participantReunion)
      }
    }
    if (this.event.type == "En déplacement") {
      this.event.participantDeplacement = this.event.participantCameroun.concat(this.event.participantGuest).concat(this.event.participantStaff).concat(this.event.participantStagiaire);
      if (!this.event.participantDeplacement.includes(this.currentUser)) {
        this.event.participantDeplacement.push(this.currentUser);
        console.log('event.participantDeplacement', this.event.participantDeplacement)
      }
    }
    console.log("participantReunion", this.event.participantReunion)
    console.log("participantDeplacement", this.event.participantDeplacement)
    this.event.fin = (new Date(this.event.fin).getUTCFullYear() + "-" + (new Date(this.event.fin).getMonth() + 1) + "-" + new Date(this.event.fin).getDate() + " " + this.event.timefin).toString();
    this.event.debut = (new Date(this.event.debut).getUTCFullYear() + "-" + (new Date(this.event.debut).getMonth() + 1) + "-" + new Date(this.event.debut).getDate() + " " + this.event.timedebut).toString();
    console.log('this.event.debut', this.event.debut);
    console.log('this.event.fin', this.event.fin);
    this.event.idEvent = this.api.idEvent;
    console.log('his.event.idEvent', this.event.idEvent);

    let Desponiblite = {
      participantReunion: [], participantDeplacement: [], date: new Date().toISOString()
    }
    Desponiblite.participantReunion = this.event.participantReunion
    Desponiblite.participantDeplacement = this.event.participantDeplacement
    Desponiblite.date = this.event.debut


    console.log('Desponiblite', Desponiblite)
    this.api.VerificationDesponiblite(Desponiblite).then(d => {
      let data = JSON.parse(d.data);
      console.log('data', data)
      this.Presences = data.Presence;
      this.api.dismissFn()
      this.Presences.forEach(element => {
        if (element.TeleTravail.length != 0 || element.demandeConges.length != 0 || element.demandeSorties.length != 0 || element.evenements != 0) {
          this.exist = true
          console.log('this.exist', this.exist)
        }
      });
      if (this.exist == true) {
        this.GoesTO(this.Presences).then(d => {
          this.exist = false
        })
        console.log('this.existGOTO', this.exist)
      } else {
        this.CreeEvenement()
        console.log('this.existcREER', this.exist)
      }
    }).catch(e => {
      console.log('e', e)
    })
  }


  ResetView() {
    this.event = {
      "debut": moment(new Date()).format('YYYY-MM-DD'),
      "fin":   moment(new Date()).format('YYYY-MM-DD'),
      "timedebut" : "08:00",
      "timefin" : "18:00",
      "nom": "",
      "lieu": "SFM",
      "salle": 1,
      "description": "",
      "type": "En réunion",
      "personnels": [],
      "participantReunion": [],
      "participantDeplacement": [],
      "participantStaff": [],
      "participantStagiaire": [],
      "participantGuest": [],
      "participantCameroun": [],
      "idEvent": null,
      "createur": null,
      "users": ["1"]
    }
  }

  logout() {
    this.authService.logout();
  }
  async showAlert(header, sub, msg) {
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
              this.api.NoteEventNOnColture(this.idEvent)
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


  public salles;
  ionViewWillEnter() {

    this.getProprietaire()






    this.storage.get('currentUser').then((val) => {
      //  this.personnels.push(val.id)
      this.currentUser = val.id;

      this.event.personnels.push(val.id);

    });

  }



}
