import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../../app/services/restapi.service';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment/moment.js';
import 'moment-timezone';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
@Component({
  selector: 'app-add-equipement',
  templateUrl: './add-equipement.page.html',
  styleUrls: ['./add-equipement.page.scss'],
})
export class AddEquipementPage implements OnInit {

  equipements = {

    "description": "",
    "idproprietaire": null,
    "dateAcquisition": new Date().toISOString(),
    "idcategorie": null,
    "prix": null,
    "idetat": null,
    "quantite": null,
    "num_serie": "",
    "localisation": "",
    "nom": "",
    "commentaire": "",
    "imageData": null,
    "TypeFile": null,
    "users": null,
    "type": null

  }

  constructor(public api: RestapiService, public ToastController: ToastController, public FilePath: FilePath, public FileChooser: FileChooser, public Base64: Base64, public Camera: Camera, public nav: NavController, public AlertController: AlertController) { }
  ngOnInit() {
    this.getProprietaire();
    this.getcategorie();
    this.getEtat();

  }

  verifeChamp = false;
  addEquipement() {
    this.verifeChamp = true;

    this.equipements.dateAcquisition = moment(new Date(this.equipements.dateAcquisition)).toISOString();

    if (this.equipements.quantite && this.equipements.localisation && this.equipements.nom && this.equipements.type) {
      this.verifeChamp = false;
      this.loadFile = true;

      setTimeout(() => {
        this.presentToast('Equipement emprunté  avec succès');
        this.nav.navigateRoot(`/equipement-by-group`);
      }, 3000);

      this.api.ajouterEquipement(this.equipements).subscribe(data => {


      }, err => {
        console.log(err);

      })

    }
  }

  async presentToast(msg: string) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  categories = []
  getcategorie() {
    this.api.getCategorie().then(d => {
      let data = JSON.parse(d.data);
      this.categories = data.categorie;

      console.log("categories", this.categories);


    })
  }
  proprietaires = []
  stagiaires
  cameroun
  guest
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
  etats = []
  getEtat() {
    this.api.getEtat().then(d => {
      let data = JSON.parse(d.data);
      this.etats = data.etat;
      console.log("etat", this.etats);

    })
  }

  async presentAlertConfirm() {
    const alert = await this.AlertController.create({
      header: 'Ajouter fichier',
      message: '',
      buttons: [{
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
    let options = { quality: 100, correctOrientation: true };
    this.Camera.getPicture(options).then(imageData => {
      this.Base64.encodeFile(imageData).then((base64File: string) => {
        this.equipements.TypeFile = "jpeg";
        this.equipements.imageData = base64File;


      }), (err) => {
        console.log(err);
      };


    })

  }

  loadFile = false;
  chargerImageStorage() {

    this.FileChooser.open().then(uri => {


      // get file path
      this.FilePath.resolveNativePath(uri).then(file => {

        this.equipements.TypeFile = file.split(".")[1];

        let filePath: string = file;
        if (filePath) {
          // convert your file in base64 format
          this.Base64.encodeFile(filePath).then((base64File: string) => {

            this.equipements.imageData = base64File;




          }, (err) => {
            console.log('err' + JSON.stringify(err));

          });
        }
      }).catch(err => console.log(err));



    }).catch(e => console.log('uri' + JSON.stringify(e)));






  }
}
