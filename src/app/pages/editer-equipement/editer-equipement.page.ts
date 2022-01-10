import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import * as moment from 'moment/moment.js';
import 'moment-timezone';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
@Component({
  selector: 'app-editer-equipement',
  templateUrl: './editer-equipement.page.html',
  styleUrls: ['./editer-equipement.page.scss'],
})
export class EditerEquipementPage implements OnInit {
  idequipemenet
  equipements = {
    "description": "",
    "owner": null,
    "dateAcquisition": new Date().toISOString(),
    "categorie": null,
    "prix": null,
    "etat": null,
    "quantite": null,
    "numeroSerie": "",
    "localisation": "",
    "nom": "",
    "commentaire": "",
    "imageData": null,
    "TypeFile": null
  }
  constructor(public api: RestapiService, public FilePath: FilePath, public AlertController: AlertController, public FileChooser: FileChooser, public Base64: Base64, public Camera: Camera, public activatedRoute: ActivatedRoute, public ToastController: ToastController, public nav: NavController) { }

  ngOnInit() {
    this.idequipemenet = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idequipemenet);
    this.getDetail(this.idequipemenet);
    this.getProprietaire();
    this.getEtat();
    this.getcategorie();

  }

  detail = []
  getDetail(id) {
    this.api.getDetailEquipement(id).then(d => {
      let data = JSON.parse(d.data);
      this.equipements = data.detail[0];
      this.equipements.etat = this.equipements.etat.id;
      this.equipements.owner = this.equipements.owner.id;
      this.equipements.categorie = this.equipements.categorie.id;
      console.log("this.detail", this.detail);
    })

  }
  verifeChamp = false;
  EditerEquipement() {
    this.verifeChamp = true;

    this.equipements.dateAcquisition = moment(new Date(this.equipements.dateAcquisition)).toISOString();

    if (this.equipements.quantite && this.equipements.localisation && this.equipements.nom) {
      this.verifeChamp = false;
      this.loadFile = true;

      setTimeout(() => {
        this.presentToast('Equipement modifié avec succès');
        this.nav.navigateRoot(`/mes-equipement`);
      }, 2000);

      this.api.EditerEquipement(this.equipements, this.idequipemenet).subscribe(data => {


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
  getProprietaire() {
    this.api.getProprietaire().then(d => {
      let data = JSON.parse(d.data);
      this.proprietaires = data.all;
      console.log("all", this.proprietaires);
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
