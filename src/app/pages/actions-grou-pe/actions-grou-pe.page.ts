import { Component, OnInit } from "@angular/core";
import { RestapiService } from "../../services/restapi.service";
import { Storage } from "@ionic/storage";
import { environment } from "../../../environments/environment";
import * as moment from 'moment/moment.js';
import 'moment-timezone';
import { AuthtificationtokenService } from "../../services/authtificationtoken.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { JsonPipe } from "@angular/common";
import { HistroiqueActionPage } from "../histroique-action/histroique-action.page";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Base64 } from "@ionic-native/base64/ngx";
import { NavController, ToastController, Platform, ModalController, AlertController, MenuController } from '@ionic/angular';

import { DatePicker } from "@ionic-native/date-picker/ngx";
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';

import { File } from "@ionic-native/file/ngx";
import { FileChooser } from "@ionic-native/file-chooser/ngx";
import { FilePath } from "@ionic-native/file-path/ngx";
import { Chooser } from "@ionic-native/chooser/ngx";
@Component({
  selector: "app-actions-grou-pe",
  templateUrl: "./actions-grou-pe.page.html",
  styleUrls: ["./actions-grou-pe.page.scss"],
})
export class ActionsGrouPePage implements OnInit {
  currentUser;
  public columns: any;
  env = environment.pathavatar;
  environment = environment.pathfile;
  hours;
  segment = "Me";
  token;
  decode;
  roles;
  supervision;

  ticket = {
    hours: null,
    commentaire: "",
    date: new Date().toISOString(),
    etat: "1",
    TypeFile: null,
    imageData: null,
  };
  action = {
    titre: null,
    heure: null,
    comment: "",
    date: new Date().toISOString(),
    statut: "1",
    TypeFile: null,
    imageData: null,
  };

  tache = {
    hours: null,
    commentaire: "",
    etat: "1",
  };
  dateRelanceBilan = new Date()

  constructor(
    public api: RestapiService,
    private helper: JwtHelperService,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private base64: Base64,
    private camera: Camera,
    private authService: AuthtificationtokenService,
    private nav: NavController,
    private storage: Storage,
    private modalctrl: ModalController,
    private alertCtrl: AlertController,
    private localNotifications: LocalNotifications,
    private Platform: Platform,
  ) {

  }
  actions = [];
  AddActionSponT() {
    this.actions.push(this.action);
  }
  removeAddActionSponT(i: number) {
    this.actions.splice(i, 1);
  }
  Mindate
  ngOnInit() {
    this.token = this.authService.getToken();
    this.decode = this.helper.decodeToken(this.token);
    this.roles = this.decode.roles;

    this.roles.forEach((element) => {
      if (element == "ROLE_SUPERVISION_TELETRAVAIL") {
        this.supervision = element;
      }
    });
    console.log("supervision", this.supervision);

    if ((new Date(this.action.date).getDate() - 5) <= 0) {
      if ((new Date(this.action.date).getMonth()) == 0) {

        this.Mindate = (new Date(this.action.date).getFullYear() - 1 + "-" + 12 + "-" + (new Date(this.action.date).getDate() + 25))
        this.Mindate = new Date(this.Mindate).toISOString();

      } else {

        this.Mindate = (new Date(this.action.date).getFullYear() + "-" + (new Date(this.action.date).getMonth()) + "-" + (new Date(this.action.date).getDate() + 25))

        this.Mindate = new Date(this.Mindate).toISOString();

      }

    } else {

      this.Mindate = ((new Date(this.action.date).getFullYear()) + "-" + (new Date(this.action.date).getMonth() + 1) + "-" + (new Date(this.action.date).getDate() - 5))
      this.Mindate = new Date(this.Mindate).toISOString();

    }

    this.storage.get("currentUser").then((val) => {
      this.currentUser = val.id;
      console.log("this.currentsssUser", this.currentUser);
      this.getTasksParId(this.currentUser);
      this.getPersonnelBySupperieur(this.currentUser);
      this.getTasksSpontanee(this.currentUser);

    });

    this.getPersonnels();
  }
  updateMyDate(event) {
    console.log("eventt", event);
  }
  enabled;
  isenabled = false;
  ChangeState(id) {
    this.enabled = id;
  }

  TasksParId;
  getTasksParId(id) {
    this.api.getTasksParId(id).then((d) => {
      let data = JSON.parse(d.data);
      this.TasksParId = data.listTicket;
      console.log("TasksParId", this.TasksParId);
    });
  }
  TasksGFromHistorique
  arrayTT = []
  arrayDate = []
  user
  data = {
    "date": null
  }
  getTasksGFromHistorique(id) {
    this.arrayTT = [];
    this.arrayDate = [];
    this.segment = "User";
    this.api.getTasksGFromHistorique(id).then(d => {
      let data = JSON.parse(d.data);
      this.TasksGFromHistorique = data.listTicket;
      if (this.TasksGFromHistorique) {
        this.arrayTT = Array.from(Object.keys(this.TasksGFromHistorique), k => [`${k}`, Object.values(this.TasksGFromHistorique[k])]);
      }

      console.log("arrayTT", this.arrayTT)
    });


  }


  listes
  PersonnelBySupperieur;
  getPersonnelBySupperieur(id) {
    this.api.getPersonnelBySupperieur(id).then((d) => {
      let data = JSON.parse(d.data);
      this.PersonnelBySupperieur = data.listPersonel;
      this.listes = data.list;
      console.log("PersonnelBySupperieur", this.PersonnelBySupperieur);
      console.log("listes", this.listes);
    });
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertCtrl.create({
      header: "Partager votre avancement",
      message: "vous êtes sûre ?",
      buttons: [
        {
          text: "Annuler",
          role: 'cancel',
          handler: () => { },
        },
        {
          text: "Partager",
          cssClass: "secondary",
          handler: () => {
            this.api.PartagerAction(id, this.currentUser);
          },
        },
      ],
    });

    await alert.present();
  }

  users;
  getPersonnels() {
    this.api.getPersonnelsBySuperVision().then((d) => {
      let data = JSON.parse(d.data);
      this.users = data.personnels;

      console.log("users", this.users);
    });
  }

  commentaire = [];
  etat = [];
  heures = [];
  TasksSpontanee;
  tabs = [];

  getTasksSpontanee(id) {
    this.api.getTasksSpontanee(id).then((d) => {
      let data = JSON.parse(d.data);
      console.log('datata', data);
      this.TasksSpontanee = data.listAction;
      var x = new Date();
      var y = x.getFullYear().toString();
      ///var m = (x.getMonth() + 1).toString();
      var dd = x.getDate().toString();
      dd.length == 1 && (dd = "0" + dd);
      ///m.length == 1 && (m = "0" + m);

      this.TasksSpontanee.forEach((element) => {

        var time = element.hours.toString()
        var res = time.replace(".", ":");
        res.length == 3 && (res = res + "0");
        console.log('res', res)
        element.hours = "2020-07-07T" + "0" + res + ":00";

        console.log('element.hours.', element.hours)
        var dateSpontanee = (new Date(element.dateCreation).getUTCFullYear() + "-" + (new Date(element.dateCreation).getMonth() + 1) + "-" + (new Date(element.dateCreation).getDate()))
        console.log('dateSpontanee', dateSpontanee)
        element.dateCreation = new Date(dateSpontanee).toISOString();

      });
      console.log("TasksSpontanee", this.TasksSpontanee);
    });
  }


  DeleteActionSpontanee(id) {
    this.api.DeleteActionSpontane(id).then((data) => {
      console.log(data);
      this.api.presentToast("Opération effectuée");
      this.getTasksSpontanee(this.currentUser);
    }).catch((error) => {
      this.api.presentToast("Erreur");
      console.log(error.status);
    });
  }

  UpdateActionSpontanee(id) {
    var commentaire = (<HTMLInputElement>document.getElementById(id + "" + "commentaire")).value;
    var hours = (<HTMLInputElement>document.getElementById(id + "" + "hours")).value;
    var etat = (<HTMLInputElement>document.getElementById(id + "" + "etat")).value;
    var dateCreation = (<HTMLInputElement>document.getElementById(id + "" + "dateCreation")).value;

    let newtache = {
      commentaire: commentaire,
      hours: hours,
      etat: etat,
      date: dateCreation
    }

    newtache.hours = new Date(newtache.hours).getHours() + "." + new Date(newtache.hours).getMinutes();

    console.log('newtache.hours', newtache.hours)
    console.log('tete', commentaire + " " + hours + " " + etat + "" + dateCreation);
    console.log('newtache', newtache);

    //newtache.hours = "" + new Date(newtache.hours).getHours();
    this.api
      .UpdateActionSpontanee(id, newtache)
      .then((data) => {
        console.log(data);
        this.api.presentToast("Opération effectuée");
        this.getTasksSpontanee(this.currentUser);
      })
      .catch((error) => {
        this.api.presentToast("Erreur");
        console.log(error.status);
      });
  }
  historique: false;
  async GoesTOHistorique(id) {
    console.log('id', id);
    const modal = await this.modalctrl.create({
      component: HistroiqueActionPage,
      componentProps: {
        idactionProg: id,
        historique: true
      },
    });
    modal.present();
  }
  detail: false;
  async GoesTODetail(id) {
    console.log('id', id);
    const modal = await this.modalctrl.create({
      component: HistroiqueActionPage,
      componentProps: {
        idactionSpon: id,
        detail: true
      },
    });
    modal.present();
  }

  verifeChamp = false;
  validerAction(id) {
    this.verifeChamp = true;
    if (this.ticket.hours) {
      this.verifeChamp = false;
      console.log("hoursssss", this.ticket.hours);
      this.ticket.hours = new Date(this.ticket.hours).getHours() + "." + new Date(this.ticket.hours).getMinutes();
      console.log("hour", this.ticket.hours);
      setTimeout(() => {
        console.log("Async operation has ended");
        this.ticket = {
          hours: null,
          date: new Date().toISOString(),
          commentaire: null,
          etat: "1",
          TypeFile: null,
          imageData: null,
        };
      }, 2000);
      this.api
        .ActionTeletravail(this.ticket, id)
        .then((data) => {
          console.log(data);
          this.api.presentToast("Opération effectuée");
          this.getTasksParId(this.currentUser);
        })
        .catch((error) => {
          this.api.presentToast("Erreur");
          console.log(error.status);
        });
    }
  }

  valChange(value: string, index: number): void {
    this.ticket.commentaire = value;
  }
  validerActionSpontanee(i: number) {
    console.log("hourhourhourhour", this.action.heure);
    this.verifeChamp = true;
    if (this.action.heure && this.action.titre) {
      this.verifeChamp = false;
      this.action.heure = new Date(this.action.heure).getHours() + "." + new Date(this.action.heure).getMinutes();
      console.log("hour", this.action.heure);
      console.log("date", this.action.date);
      setTimeout(() => {
        console.log("Async operation has ended");
        this.action = {
          titre: null,
          heure: null,
          comment: null,
          date: new Date().toISOString(),
          statut: "1",
          TypeFile: null,
          imageData: null,
        };
      }, 2000);
      this.api
        .ValiderActionSpontanee(this.action, this.currentUser)
        .then((data) => {
          console.log(data);
          this.api.presentToast("Opération effectuée");
          this.getTasksSpontanee(this.currentUser);
          this.actions.splice(i, 1);

        })
        .catch((error) => {
          this.api.presentToast("Erreur");
          console.log(error.status);
        });
    }
  }
  async AlertUpdate(id) {
    const alert = await this.alertCtrl.create({
      header: "Voulez vous modifier cette action ?",
      message: "",
      buttons: [
        {
          text: "Annuler",
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: "Confirmer",
          cssClass: "secondary",
          handler: () => {
            this.UpdateActionSpontanee(id);

          },
        },
      ],
    });

    await alert.present();
  }

  async AlertDelete(id) {
    const alert = await this.alertCtrl.create({
      header: "Voulez vous Supprimer cette action ?",
      message: "",
      buttons: [
        {
          text: "Annuler",
          role: 'cancel',
          handler: () => {

          },
        },
        {
          text: "Confirmer",
          cssClass: "secondary",
          handler: () => {
            this.DeleteActionSpontanee(id);

          },
        },
      ],
    });

    await alert.present();
  }

  async PieceJoint() {
    const alert = await this.alertCtrl.create({
      header: "Ajouter fichier",
      message: "",
      buttons: [
        {
          text: "Gallery",
          handler: () => {
            this.chargerImageStorage();
          },
        },
        {
          text: "Camera",
          cssClass: "secondary",
          handler: () => {
            this.chargerImageCamera();
            console.log("camera");
          },
        },
      ],
    });

    await alert.present();
  }
  chargerImageCamera() {
    console.log("upload in progress...");
    let options = { quality: 100, correctOrientation: true };

    this.camera.getPicture(options).then((imageData) => {
      this.base64.encodeFile(imageData).then(
        (base64File: string) => {
          this.ticket.TypeFile = "jpeg";
          this.ticket.imageData = base64File;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  loadFile = false;
  chargerImageStorage() {
    this.fileChooser
      .open()
      .then((uri) => {
        // get file path
        this.filePath
          .resolveNativePath(uri)
          .then((file) => {
            this.ticket.TypeFile = file.split(".")[1];

            let filePath: string = file;
            if (filePath) {
              // convert your file in base64 format
              this.base64.encodeFile(filePath).then(
                (base64File: string) => {
                  this.ticket.imageData = base64File;
                },
                (err) => {
                  console.log("err" + JSON.stringify(err));
                }
              );
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => console.log("uri" + JSON.stringify(e)));
  }

  async alert() {
    const alert = await this.alertCtrl.create({
      header: "Ajouter fichier",
      message: "",
      buttons: [
        {
          text: "Gallery",
          handler: () => {
            this.ImageStorage();
          },
        },
        {
          text: "Camera",
          cssClass: "secondary",
          handler: () => {
            this.ImageCamera();
            console.log("camera");
          },
        },
      ],
    });
    await alert.present();
  }

  ImageCamera() {
    console.log("upload in progress...");
    let options = { quality: 100, correctOrientation: true };

    this.camera.getPicture(options).then((imageData) => {
      this.base64.encodeFile(imageData).then(
        (base64File: string) => {
          this.action.TypeFile = "jpeg";
          this.action.imageData = base64File;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
  ImageStorage() {
    this.fileChooser
      .open()
      .then((uri) => {
        // get file path
        this.filePath
          .resolveNativePath(uri)
          .then((file) => {
            this.action.TypeFile = file.split(".")[1];

            let filePath: string = file;
            if (filePath) {
              // convert your file in base64 format
              this.base64.encodeFile(filePath).then(
                (base64File: string) => {
                  this.action.imageData = base64File;
                },
                (err) => {
                  console.log("err" + JSON.stringify(err));
                }
              );
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((e) => console.log("uri" + JSON.stringify(e)));
  }








}
