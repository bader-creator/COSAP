import { Component } from '@angular/core';
import { RestapiService } from './../../../app/services/restapi.service';
import { Storage } from '@ionic/storage';
import { AuthtificationtokenService } from 'src/app/services/authtificationtoken.service';
import { ToastController, AlertController, Platform, NavController, MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment/moment.js';
import 'moment-timezone';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnCopieByDatePage } from '../en-copie-by-date/en-copie-by-date.page'

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  // env=environment.urlupload;
  ticketcopie = {
    "taskid": null,
    "user": null,
  }

  env = environment.pathavatar;
  user

  counttasksrequest = 0
  segment = "Request"
  ticket
  userselected
  usersEnCopie
  prioriter
  typetache
  codetache;
  typeprojets;
  codetachepartype = [];
  labelprioriter
  labeltypetache
  labelcodetache
  labeltypeprojet
  idticket

  proposition
  interne
  formation
  soumission



  ticketObject = {
    "titre": null,
    "idprioriter": null,
    "idtypetache": null,
    "idtypeprojet": null,
    "idinterne": null,
    "idsoumission": null,
    "idformation": null,
    "idproposition": null,
    "description": null,
    "nbrHj": null,
    "Echeance": new Date().toISOString(),
    "time": "18:00",
    "points": null,
    "idDestinataire": null,
    "idOwner": null,
    "idUserEnCopie": null,
    "path": null,
    "imageData": null
  }



  constructor(public menuCtrl: MenuController, private modalctrl: ModalController, private helper: JwtHelperService, private api: RestapiService, private storage: Storage, private authService: AuthtificationtokenService, private toastController: ToastController, private alertCtrl: AlertController, private platform: Platform, private nav: NavController, private activatedRoute: ActivatedRoute) {

    this.api.validation = false;

    this.menuCtrl.enable(true);
    this.platform.backButton.subscribe(() => {
      this.nav.navigateRoot(`/index`);
    });







  }

  ionViewWillLeave() {
    this.api.dismissFn();
  }

  hidefunc(id) {


    if (document.getElementById(id).style.display == 'block') {
      document.getElementById(id).style.display = 'none';
    } else {
      document.getElementById(id).style.display = 'block';
    }
  }

  User
  currentUser;
  token
  decoded
  roles
  Stagiaire
  idUser
  ionViewWillEnter() {
    if (this.activatedRoute.snapshot.paramMap.get('state')) {
      this.segment = this.activatedRoute.snapshot.paramMap.get('state')
    }

    this.token = this.authService.getToken();
    this.decoded = this.helper.decodeToken(this.token);
    this.roles = this.decoded.roles;
    this.roles.forEach(element => {
      if (element == "ROLE_STAGIAIRE")
        this.Stagiaire = element;

    });
    this.storage.get('currentUser').then((val) => {
      this.idUser = val.id

      this.GetTaskAsigned(this.idUser)

    });


  }




  async validerTicket(id, task) {
    this.api.task = task;


    this.api.validerTicket(id);
    const alert = await this.alertCtrl.create({
      message: 'Voulez vous affecter une autre action ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Oui',
          handler: data => {


            this.api.validation = true;

            this.nav.navigateRoot('/add-task');


          }

        }

      ]

    });


    await alert.present();

  }
  async ArchiverTicker(taskid) {
    const alert = await this.alertCtrl.create({
      message: 'Vous Voulez archiver cette action ? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Confirmer',
          handler: data => {
            this.api.ArchiverAction(taskid).then(d => {
              this.api.presentToast('Opération effectuée')
              this.refresh()
            })

          }
        }
      ]
    });
    await alert.present();
  }

  async annulerTicket(taskid) {
    const alert = await this.alertCtrl.create({
      message: 'Confirmer annulation',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {

          }
        },
        {
          text: 'Confirmer',
          handler: data => {

            this.api.terminerTicket(taskid, "", "Annuler");

          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(event) {

    this.refresh();
    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }



  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }



  dateDiff(deadline) {
    var d = moment(moment(), 'YYYY-MM-DD');
    var f = moment(deadline, 'YYYY-MM-DD');

    return f.diff(d, 'days');
  }


  dateComp(datelimit) {
    var d = moment(moment(), 'YYYY-MM-DD');
    var f = moment(datelimit, 'YYYY-MM-DD');

    if (d > f) {

      return true
    } else {

      return false
    }
  }
  public isSearchbarOpened = false;
  archive = []
  EnCopie = []
  Bu = []
  getItems(event) {
    let val = event.target.value;
    this.archive = [];
    this.EnCopie = [];
    this.Bu = [];
    console.log('TaskByBU', this.TaskByBU)
    this.archive = this.TaskArchive
    this.EnCopie = this.api.TaskEnCopie
    this.Bu = this.TaskByBU
    console.log('Bu', this.Bu)
    if (this.segment == "Archive") {
      if (val && val.trim() != '') {
        this.archive = this.archive.filter((location) => {
          if (location.userDestination.lastName != null)
            return location.userDestination.lastName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
      }
    }
    if (this.segment == "BU") {
      if (val && val.trim() != '') {
        this.Bu = this.Bu.filter((location) => {
          console.log('location', location)
          console.log('location.userDestination.lastName', location.userDestination.lastName)
          if (location.userDestination.lastName != null)
            return location.userDestination.lastName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
      }
    }
    if (this.segment == "EnCopie") {
      if (val && val.trim() != '') {
        this.EnCopie = this.EnCopie.filter((location) => {
          if (location.userDestination.lastName != null)
            return location.userDestination.lastName.toLowerCase().indexOf(val.toLowerCase()) > -1;
        })
      }
    }


  }
  async EncopieByDate() {
    const modal = await this.modalctrl.create({
      component: EnCopieByDatePage,
      cssClass: 'enCopieByDate'

    })
    modal.present();
  }
  date = null
  GetTaskEnCopie() {
    console.log('this.idUser', this.idUser)
    console.log('this.date', this.date)
    this.api.GetEnCopie(this.idUser, this.date);
  }




  async annulerTicketCopie(taskid) {

    this.ticketcopie = {
      "taskid": taskid,
      "user": this.idUser
    }
    const alert = await this.alertCtrl.create({
      message: 'Voulez vous supprimer  ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Confirmer',
          handler: data => {
            console.log('this.ticketcopie', this.ticketcopie)
            this.api.AnnulerTicketCopie(this.ticketcopie)
          }
        }
      ]
    });
    await alert.present();
  }
  TaskAsigned
  GetTaskAsigned(idUser) {
    if (this.TaskAsigned) {

    } else {
      this.api.loadingFn()
      this.api.GetTaskAsigned(idUser).then(d => {
        let data = JSON.parse(d.data)
        this.TaskAsigned = data.TicketAsigned;
        console.log('TaskAsigned', this.TaskAsigned);
        this.api.dismissFn();
      }).catch((error) => {
        this.api.dismissFn();
        this.presentToast("Erreur");

      });
    }

  }

  TaskTOdo
  GetTaskTOdo() {
    if (this.TaskTOdo) {

    } else {
      this.api.loadingFn()
      this.api.GetTaskTOdo(this.idUser).then(d => {
        let data = JSON.parse(d.data)
        this.TaskTOdo = data.TicketToDo;
        console.log('TaskTOdo', this.TaskTOdo);
        this.api.dismissFn();
      }).catch((error) => {
        this.api.dismissFn();
        this.presentToast("Erreur");
        console.log(error.status);
      });
    }

  }

  TaskByBU

  GetTaskByBU() {
    if (this.TaskByBU) {

    } else {
      this.api.loadingFn()
      this.api.GetTaskByBU(this.idUser).then(d => {
        let data = JSON.parse(d.data)
        this.TaskByBU = data.TicketBU;
        this.Bu = data.TicketBU;
        console.log('TaskByBU', this.TaskByBU);
        this.api.dismissFn();
      }).catch((error) => {
        this.api.dismissFn();
        this.presentToast("Erreur");
      });
    }

  }
  TaskArchive
  GetTaskArchive() {
    if (this.TaskArchive) {

    } else {
      this.api.loadingFn()
      this.api.GetTaskArchive(this.idUser).then(d => {
        let data = JSON.parse(d.data)
        this.TaskArchive = data.TicketArchive;
        this.archive = data.TicketArchive;
        console.log('TaskArchive', this.TaskArchive);
        this.api.dismissFn();
      }).catch((error) => {
        this.api.dismissFn();
        this.presentToast("Erreur");
      });
    }

  }

  refresh() {
    if (this.segment == "Archive") {
      this.TaskArchive = null;
      console.log('archive')
      this.GetTaskArchive()
    }
    else if (this.segment == "BU") {
      console.log('BU')
      this.TaskByBU = null;
      this.GetTaskByBU()
    }
    else if (this.segment == "EnCopie") {
      console.log('EnCopie')
      this.api.TaskEnCopie = null;
      this.api.GetEnCopie(this.idUser, this.date);
    }
    else if (this.segment == "To Do") {
      console.log('To Do')
      this.TaskTOdo = null;
      this.GetTaskTOdo()
    }
    else {
      console.log('TaskAsigned')
      this.TaskAsigned = null;
      this.GetTaskAsigned(this.idUser)
    }
  }


}
