import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestapiService } from './../../../app/services/restapi.service';
import { Storage } from '@ionic/storage';
import { AuthtificationtokenService } from '../../../app/services/authtificationtoken.service';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment/moment.js';
import 'moment-timezone';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { DatePicker } from '@ionic-native/date-picker/ngx';


import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { environment } from '../../../environments/environment';
import { UsersPage } from '../users/users.page';


@Component({
  selector: 'app-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  // env=environment.urlupload;
  //departements=[{name:'Technique'},{name:'Commercial'},{name:'Administratif et financier'},{name:'GRH et management de qualité'}];
  //technique=[{name:'BU IT'},{name:'BU TELCO'},{name:'BU IA'}]
  //adminstratif=[{name:'BU IT'},{name:'BU TELCO'},{name:'BU IA'}]
  env = environment.pathavatar;
  tasksrequest
  TicketEnCopie
  tasksToDo
  tasksBu
  counttasksrequest = 0
  segment
  ticket
  prioriter
  typetache
  codetache;
  typeprojets;
  codetachepartype = [];
  labelprioriter
  labeltypetache
  labelcodetache
  labeltypeprojet






  proposition
  interne = []
  formation
  soumission



  usersEnCopie = [];

  userSelected2 = {
    "nom": "",
    "prenom": "",
    "email": "",
    "charge": null,
    "id": null,
  }
  userSelected;
  charge_personnel
  ticketObject = {
    "titre": null,
    "idprioriter": null,
    "idtypetache": null,
    "idtypeprojet": null,

    "idinterne": null,
    "idexterne": null,
    "idsoumission": null,
    "idformation": null,
    "idproposition": null,


    "idtache": null,

    "description": "",

    "nbrHj": null,
    "Echeance": moment(new Date()).format('YYYY-MM-DDT')+"08:00",
    "time": "10:00",
    "points": null,
    "idDestinataire": null,
    "idOwner": null,
    "idUserEnCopie": null,
    "path": null,
    "imageData": null,
    "typeFile": null,



  }


  matches: Array<String> = [];
  isListening = false;

  constructor(public menuCtrl: MenuController, public api: RestapiService, private storage: Storage, private authService: AuthtificationtokenService, private toastController: ToastController, private alertCtrl: AlertController, private platform: Platform, private nav: NavController, private camera: Camera, private base64: Base64, private datePicker: DatePicker, private file: File, private fileChooser: FileChooser, private filePath: FilePath, private chooser: Chooser, public loadingController: LoadingController, public modalCtrl: ModalController, private ChangeDetectorRef: ChangeDetectorRef,


  ) {


    this.menuCtrl.enable(true);

    this.platform.backButton.subscribe(() => {
      this.api.taskShortCut = null;
      this.nav.navigateRoot(`/task`);
      this.loadFile = false;
    });







  }



  ngOnInit() {

    if (this.api.taskShortCut) {

      this.userSelected = this.api.taskShortCut.personnel;

      this.ticketObject.Echeance = moment(this.api.taskShortCut.date).toISOString();
    }


  }



  hidefunc(id) {


    if (document.getElementById(id).style.display == 'block') {
      document.getElementById(id).style.display = 'none';
    } else {
      document.getElementById(id).style.display = 'block';
    }
  }
  task
  currentUser;
  projects
  idUser;
  externe = []
  techniques = [];
  adminstratifs = []
  Commercials = []
  grh = []
  contractes
  ionViewWillEnter() {
    this.task = this.api.task;
    console.log("task", this.task);
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val;

      this.storage.get('iduser').then((val) => {
        this.idUser = val;
      });



      this.api.getTasks(val.id).then(d => {
        let data = JSON.parse(d.data)
        this.prioriter = data.priorite;
        this.typetache = data.typeTask;
        this.typeprojets = data.typeprojet;
        console.log('typeprojets', this.typeprojets);
        this.proposition = data.proposition;
        this.projects = data.interne;
        this.projects.forEach(element => {
          if (element.interne == true) {
            this.interne.push({ "id": element.id, "libelle": element.libelle });

          } else {
            this.externe.push({ "id": element.id, "libelle": element.libelle });

          }

        });
        console.log('interne', this.interne);
        console.log('externe', this.externe);
        this.formation = data.formation;
        this.contractes = data.contractes;
        console.log('contractes', this.contractes);

        this.soumission = data.soumission;


        this.typetache.forEach(element => {
          if (element.valeurNomenclature.id == 118 || element.valeurNomenclature.id == 119) {
            this.adminstratifs.push({ "id": element.id, "valeur": element.valeur });
          }
          else if (element.valeurNomenclature.id == 173 || element.valeurNomenclature.id == 174) {
            this.grh.push({ "id": element.id, "valeur": element.valeur });
          }
          else if (element.valeurNomenclature.id == 67) {
            this.Commercials.push({ "id": element.id, "valeur": element.valeur })
          }

          else if (element.valeurNomenclature.id == 68 || element.valeurNomenclature.id == 117 || element.valeurNomenclature.id == 69) {
            this.techniques.push({ "id": element.id, "valeur": element.valeur })

          }
          else if (element.id == 131 || element.id == 132 || element.id == 133 || element.id == 134 || element.id == 135 || element.id == 136 || element.id == 137) {
            this.Commercials.push({ "id": element.id, "valeur": element.valeur })
          }

        });



      });
      this.prioriter.forEach(element => {
        if (element.code == "C03") {
          this.ticketObject.idprioriter = element.id;
        }
      });
    });



  }




  verifeChamp = false;
  addticket() {
    this.verifeChamp = true;

    this.ticketObject.idDestinataire = this.userSelected.id;
    this.ticketObject.idOwner = this.idUser;
    this.charge_personnel = this.userSelected.charge;



    if (this.charge_personnel >= 80 && this.ticketObject.idprioriter != 22) {
      this.force_charge();
    } else {
      let idUsers = [];

      if (this.usersEnCopie != undefined) {
        this.usersEnCopie.forEach(element => {
          idUsers.push(element.id)
        });
      }


      this.ticketObject.idUserEnCopie = idUsers;
     /* if (this.api.validation == false) {
        this.ticketObject.Echeance = moment(new Date(this.ticketObject.Echeance).setHours(Number(this.ticketObject.time.split(":")[0]), Number(this.ticketObject.time.split(":")[1]), 0, 0)).toISOString();
      }*/
      console.log("this.ticketObject.Echeance ",this.ticketObject.Echeance )
      if (this.ticketObject.idDestinataire && this.ticketObject.idtypetache && this.ticketObject.nbrHj && this.ticketObject.idtypeprojet && this.ticketObject.titre
        && this.ticketObject.idtache) {

        this.verifeChamp = false;
        this.loadFile = true;
        console.log("aaaaaaaaaaaaaaaa")

        setTimeout(() => {
          this.presentToast("Action ajoutée avec succès");
          this.nav.navigateRoot('/task/Request');
        }, 2000);

        console.log("this.ticketObject", this.ticketObject)
        this.api.ajouterTicket(this.ticketObject).subscribe(data => {
         
          this.resetView();




        }, err => {
          console.log(err);
          this.resetView();
        })

      }
    }






  }


  async force_charge() {
    const alert = await this.alertCtrl.create({
      header: 'Vous êtes d\'accord?',
      message: 'S\'il vous plaît dites si vous êtes d\'accord?',
      buttons: [
        {
          role: 'cancel',
          text: 'Annuler',
          cssClass: 'secondary',
          handler: () => {
          }
        },
        {
          text: 'Ajouter',
          cssClass: 'secondary',
          handler: () => {

            setTimeout(() => {
              this.presentToast("action ajouté avec succes");
              this.nav.navigateRoot('/task/Request');
            }, 2000);
            this.api.ajouterTicket(this.ticketObject).subscribe(data => {

              this.resetView();



            }, err => {
              console.log(err);
              this.resetView();
            })



          }
        }
      ]


    }
    );
    await alert.present();

  }
  logout() {
    this.authService.logout();
  }


  /*
    onDateChanged() {
  
        this.datePicker.show({
          date: new Date(),
          mode: 'datetime',
          is24Hour:	true,
         
          allowOldDates:false,
          androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
          minuteInterval:5
        }).then(
          date => console.log('Got date: ', date),
          err => console.log('Error occurred while getting date: ', err)
        );
  
      }
  */





  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }




  onKey(event: any) {
    this.ticketObject.points = this.ticketObject.nbrHj * 10;
  }




  deleteUser(email) {

    this.usersEnCopie.forEach((element, index) => {
      if (element.email == email) {
        this.usersEnCopie.splice(index, 1);

      }
    });
  }









  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Ajouter fichier',
      message: '',
      buttons: [
      /*
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
        }
      }, 
      */{
          text: 'Gallery',
          handler: () => {
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






  chargerImageCamera() {
    console.log("upload in progress...");
    let options = { quality: 100, correctOrientation: true };

    this.camera.getPicture(options).then((imageData) => {

      this.base64.encodeFile(imageData).then((base64File: string) => {

        this.ticketObject.typeFile = "jpeg";
        this.ticketObject.imageData = base64File;
      }, (err) => {
        console.log(err);
      });

    });

  }

  loadFile = false;
  chargerImageStorage() {

    this.fileChooser.open().then(uri => {


      // get file path
      this.filePath.resolveNativePath(uri).then(file => {

        this.ticketObject.typeFile = file.split(".")[1];

        let filePath: string = file;
        if (filePath) {
          // convert your file in base64 format
          this.base64.encodeFile(filePath).then((base64File: string) => {
            // this.ticketObject.imageData=base64File.split(";base64,")[1];
            // this.ticketObject.imageData=base64File.split(";charset=utf-8;base64,")[1];
            this.ticketObject.imageData = base64File;




          }, (err) => {
            console.log('err' + JSON.stringify(err));

          });
        }
      }).catch(err => console.log(err));



    }).catch(e => console.log('uri' + JSON.stringify(e)));






  }









  resetView() {
    this.loadFile = false;
    //this.presentToast("Action MAJ");


    this.segment = "Request"

    this.ticketObject = {
      "titre": null,
      "idprioriter": null,


      "idtache": null,
      "idtypetache": null,
      "idtypeprojet": null,
      "idinterne": null,
      "idexterne": null,
      "idsoumission": null,
      "idformation": null,
      "idproposition": null,
      "description": "",
      "nbrHj": null,
      "Echeance": new Date().toISOString(),
      "time": "18:00",
      "points": null,
      "idDestinataire": null,
      "idOwner": null,
      "idUserEnCopie": null,
      "path": null,
      "imageData": null,
      "typeFile": null
    }

    this.api.taskShortCut = null;
    this.userSelected = null;
    this.usersEnCopie = [];


  }





  async listUsers(id) {

    const modal = await this.modalCtrl.create({
      component: UsersPage,
      componentProps: {
        idSelect: id,
        userSelected: this.userSelected,
      },
      cssClass: "'auto-height"
    });

    modal.present();
    //à utiliser pour récupérer le jobId apres la fermeture du modale
    const { data } = await modal.onWillDismiss();
    //this.charge_personnel=this.userSelected.charge;
    if (data) {
      if (!this.usersEnCopie.includes(data.userCC) && data.userCC) { this.usersEnCopie.push(data.userCC); }

      this.userSelected = data.userSelected;
      this.userSelected2 = data.userSelected;


    }






  }



}
