import { Component } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { NavController, ToastController, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { AuthtificationtokenService } from '../../services/authtificationtoken.service';
import { Storage } from '@ionic/storage';

import * as moment from 'moment/moment.js';
import 'moment-timezone';
import { Entity } from './../Entity'
import { environment } from '../../../environments/environment';



import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-listdemande',
  templateUrl: './listdemande.page.html',
  //templateUrl: './test.page.html',
  styleUrls: ['./listdemande.page.scss'],
})
export class ListdemandePage {

  halfday;
  currentUser;
  infoSolde;
  typeConges;
  datedebut = moment(new Date()).format('YYYY-MM-DD');
  timedebut = "08:00";
  datefin = moment(new Date()).format('YYYY-MM-DD');
  timefin = "18:00"
  datereprise = moment(new Date()).format('YYYY-MM-DD');
  Datesortie = moment(new Date()).format('YYYY-MM-DD');
  timesortie = "08:00";
  timeretour = "-- --";
  segment = "conge";
  typeCongeId = -1;
  dureesortie = "1:00";
 
  teletravail = {
    "nbjours": null,
    'datedebut': moment(new Date()).format('YYYY-MM-DD'),
    'datefin': moment(new Date()).format('YYYY-MM-DD'),
    'datereprise': moment(new Date()).format('YYYY-MM-DD'),
    'timedebut': "08:00",
    'timefin': "18:00"
  }

  env = environment.pathavatar;
  constructor(
    public menuCtrl: MenuController,
    private nav: NavController,
    private api: RestapiService,
    private authService: AuthtificationtokenService,
    private toastController: ToastController,
    private storage: Storage,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private camera: Camera, private base64: Base64,
    private fileChooser: FileChooser,
    private filePath: FilePath,
  ) { this.menuCtrl.enable(true); }








  confirmerDemandeDeConge() {
    let conge = new Entity().demandeConge;

    var dateD = moment(new Date(this.datedebut).setHours(Number(this.timedebut.split(":")[0]), Number(this.timedebut.split(":")[1]), 0, 0));
    var dateF = moment(new Date(this.datefin).setHours(Number(this.timefin.split(":")[0]), Number(this.timefin.split(":")[1]), 0, 0));


    console.log("dateD", dateD)
    console.log("dateF", dateF)

    conge.dateDebutConge = moment(new Date(this.datedebut).setHours(Number(this.timedebut.split(":")[0]) + 1, Number(this.timedebut.split(":")[1]), 0, 0)).format('YYYY-MM-DD HH:mm:ss')

    console.log(conge.dateDebutConge)


    conge.dateFinConge = moment(new Date(this.datefin).setHours(Number(this.timefin.split(":")[0]) + 1, Number(this.timefin.split(":")[1]), 0, 0)).format('YYYY-MM-DD HH:mm:ss')
    conge.dateReprise = moment(this.datereprise).format('YYYY-MM-DD HH:mm:ss');

    console.log(conge.dateFinConge)
    var datehalf = moment(new Date(this.datedebut).setHours(Number(this.timedebut.split(":")[0]), Number(this.timedebut.split(":")[1]), 0, 0));
    var dateFTimehalf = moment(new Date(this.datedebut).setHours(Number(this.timefin.split(":")[0]), Number(this.timefin.split(":")[1]), 0, 0));
    
    console.log("*****");
    this.halfday = dateFTimehalf.diff(datehalf, 'hours')
    console.log(this.halfday);
    console.log("halfday", this.halfday)


    if (this.halfday == 4) {
      conge.nbJours = Number(dateF.diff(dateD, 'days')) + 0.5;
      conge.demiJournee = true;
    } else {
      conge.nbJours = Number(dateF.diff(dateD, 'days')) + 1;
      conge.demiJournee = false;
    }



    conge.etat = "En Cours";
    console.log('typeCongeId',this.typeCongeId)
    conge.typeConge = this.typeCongeId;
    console.log('conge.typeConge',conge.typeConge)



    conge.typeFile = this.typeFile;
    conge.imageData = this.imageData;



    conge.token = this.api.tokensuperuser;
    conge.title = "Demande de Congé";
    conge.idPersonnel = this.currentUser.id;
    conge.message = this.currentUser.nom + " " + this.currentUser.prenom + " demande un congé de " + moment(conge.dateDebutConge).format('YYYY-MM-DD HH:mm') + " jusqu'à " + moment(conge.dateFinConge).format('YYYY-MM-DD HH:mm');

    if (dateD.format('dd') == "sa" && this.halfday > 0) {
      this.presentToast('Demande Invalide.');
    } else {



      if (conge.typeConge == 1 && conge.imageData) {

        this.api.ajouterConge(conge).subscribe(data => {
          console.log(data);

          this.presentToast('Demande en cours de Validation.');

        }, err => {
          console.log(err);

        })
        if (this.authService.Stagiaire) {
          this.nav.navigateRoot(`/presence-stagiaire`);
        } else if (this.authService.Guest) {
          this.nav.navigateRoot(`/staff-presence`);
        }
        else if (this.authService.sfmCameroun) {
          this.nav.navigateRoot(`/sfm-cameroun-presence`);
        }
        else {
          this.nav.navigateRoot(`/index`);
        }

      }




      if (conge.typeConge == 1 && !conge.imageData) {
        this.presentToast('Certificat médical requise');
      }


      if (conge.typeConge != 1) {

        this.api.ajouterConge(conge).subscribe(data => {
          console.log(data);

          this.presentToast('Demande en cours de Validation.');

        }, err => {
          console.log(err);

        })
        if (this.authService.Stagiaire) {
          this.nav.navigateRoot(`/presence-stagiaire`);
        } else if (this.authService.Guest) {
          this.nav.navigateRoot(`/staff-presence`);
        }
        else if (this.authService.sfmCameroun) {
          this.nav.navigateRoot(`/sfm-cameroun-presence`);
        }
        else {
          this.nav.navigateRoot(`/index`);
        }


      }

    }

  }
  async AlertdemandeTeleTravail() {
    var a = moment(this.teletravail.datedebut);
    console.log('a', a)

    var b = moment(this.teletravail.datefin);
    console.log('b', b)

    this.teletravail.nbjours = b.diff(a, 'days') + 1;
    console.log('this.teletravail.nbjours', this.teletravail.nbjours)

    console.log('datedebut', this.teletravail.datedebut)
    console.log('datefin', this.teletravail.datefin)
    const alert = await this.alertController.create({
      message: 'Confirmer Demande!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('this.currentUser.id', this.currentUser.id)
            this.api.DemandeTeleTravail(this.teletravail, this.currentUser.id);
          }
        }
      ]
    });

    await alert.present();
  }

  onChangeDate(event){
    this.datereprise=moment(event).add(1, 'days').format('YYYY-MM-DD');
  }

  onChangeDateReprise(event){
    this.teletravail.datereprise=moment(event).add(1, 'days').format('YYYY-MM-DD');
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }



  loading;
  async loadingFn(msg) {
    this.loading = await this.loadingController.create({ message: msg });
    this.loading.present();
  }

  async dismissFn() {
    // console.log("dismiss");
    await this.loading.dismiss();
  }
  /************************************ */










  onTimeDebutChanged() {
    let duree = moment(this.timesortie, 'HH:mm').hour() * 60 + moment(this.timesortie, 'HH:mm').minute();
    if (duree > 480 && duree < 1020) {
      this.addtime(this.dureesortie);
    } else {
      this.timesortie = "8:00";
      this.presentToast("Temps Invalide");
    }

  }






  ConfirmerDemandeDeSortie() {

    let sortie = new Entity().demandeSortie;
    sortie.dateSortie = new Date(this.Datesortie);
    sortie.heureDebut = this.timesortie + ":00";
    this.addtime(this.dureesortie)
    sortie.heureFin = this.timeretour + ":00";
    sortie.etat = "En Cours";
    sortie.duree = this.duree(this.dureesortie);
    sortie.idPersonnel = this.currentUser.id;
    sortie.token = this.api.tokensuperuser;




    sortie.title = "Autorisation de sortie";
    sortie.message = this.currentUser.nom + " " + this.currentUser.prenom + " demande une autorisation de sortie de  " + Math.trunc(sortie.duree / 60) + " h" + (sortie.duree % 60) + " m de " + sortie.heureDebut + " jusqu'à " + sortie.heureFin;


    console.log(sortie);
    this.api.ajouterAutorisationSortie(sortie);
    this.nav.navigateForward('/home');
    this.presentToast('Demande en cours de Validation.');



  }

  async presentAlertConfirmDemandeConge() {


    const alert = await this.alertController.create({
      message: 'Confirmer Demande!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.confirmerDemandeDeConge();
          }
        }
      ]
    });

    await alert.present();
  }







  currentSuperUser;

  ionViewWillEnter() {



    this.api.getTypeConge().then(data => { this.storage.set('typeconge', JSON.parse(data.data)); });
    this.storage.get('currentUser').then((val) => { this.currentUser = val; });
    this.storage.get('currentSuperUser').then((val) => { this.currentSuperUser = val; });
    this.storage.get('infoSolde').then((val) => { this.infoSolde = val; });
    this.storage.get('typeconge').then((val) => {
      this.typeConges = val;
      this.typeCongeId = this.typeConges[0].id;
      console.log(this.typeConges);



    });






    /*
      this.api.jourFerie().then(data => {
        
        let jourFeries= JSON.parse(data.data).jourFeries;
    
        jourFeries.forEach(element => {
          this.daysoff.push( moment(element.date.date).format('YYYY-MM-DD') ) ;  
          console.log(moment(element.date.date).format('YYYY-MM-DD') );
          
        });
        
       
      });
    */

  }






  addtime(dureesortie) {

    let duree = moment(this.timesortie, 'HH:mm').hour() * 60 + moment(this.timesortie, 'HH:mm').minute() +
      moment(dureesortie, 'HH:mm').hour() * 60 + moment(dureesortie, 'HH:mm').minute();

    let hours = (Math.trunc(duree / 60));
    let mins = (duree % 60);

    if (mins < 10) {
      this.timeretour = hours.toString() + ":0" + (duree % 60).toString();
    }
    else {
      this.timeretour = hours.toString() + ":" + (duree % 60).toString();
    }

  }



  duree(dureesortie) {
    switch (dureesortie) {
      case "1:00": {
        return 60;

      }
      case "1:30": {
        return 90;

      }
      case "2:00": {
        return 120;

      }
      case "2:30": {
        return 150;

      }
      default: {
        //statements; 
        break;
      }
    }

  }


  /************************************ */








  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Ajouter certificat médical',
      message: '',
      buttons: [
        {
          text: 'Gallery',
          handler: () => {
            console.log('Confirm Okay');
            this.chargerImageStorage();

          }
        }, {
          text: 'Camera',
          cssClass: 'secondary',
          handler: () => {
            this.chargerImageCamera();
            console.log('camera');
          }
        }
      ]
    });

    await alert.present();
  }




  typeFile = "";
  imageData = "";
  chargerImageCamera() {
    console.log("upload in progress...");
    let options = { quality: 100, correctOrientation: true };

    this.camera.getPicture(options).then((imageData) => {

      this.base64.encodeFile(imageData).then((base64File: string) => {

        this.typeFile = "jpeg";
        // this.ticketObject.imageData=base64File.split(";charset=utf-8;base64,")[1];
        // this.ticketObject.imageData=base64File.split(";base64,")[1];
        this.imageData = base64File;
        console.log(base64File);
      }, (err) => {
        console.log(err);
      });

    });

  }


  chargerImageStorage() {

    this.fileChooser.open().then(uri => {


      // get file path
      this.filePath.resolveNativePath(uri).then(file => {

        this.typeFile = file.split(".")[1];

        let filePath: string = file;
        if (filePath) {
          // convert your file in base64 format
          this.base64.encodeFile(filePath).then((base64File: string) => {
            // this.ticketObject.imageData=base64File.split(";base64,")[1];
            // this.ticketObject.imageData=base64File.split(";charset=utf-8;base64,")[1];
            this.imageData = base64File;




          }, (err) => {
            console.log('err' + JSON.stringify(err));

          });
        }
      }).catch(err => console.log(err));



    }).catch(e => console.log('uri' + JSON.stringify(e)));






  }



















}

