import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-affecter-equipement',
  templateUrl: './affecter-equipement.page.html',
  styleUrls: ['./affecter-equipement.page.scss'],
})
export class AffecterEquipementPage implements OnInit {
  equipements = {
    "quantite": null,
    "users": 1,
    "equipement": null,
    "currentuser": null
  }
  constructor(private api: RestapiService, private modalController: ModalController, private storage: Storage, private ToastController: ToastController) { }
  currentUser
  id_equipement
  quantite
  ngOnInit() {
    this.id_equipement = this.id_equipement;
    this.quantite = this.quantite
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      console.log('cureent', this.currentUser)

    });
    this.getProprietaire()

  }
  verifeChamp = false;
  affecterEquipement() {
    this.verifeChamp = true;
    if (this.equipements.quantite && this.equipements.users) {
      this.equipements.equipement = parseInt(this.id_equipement);
      this.equipements.currentuser = this.currentUser;
      console.log('this.equipements', this.equipements);
      console.log('this.quantite', this.quantite)
      console.log('this.equipements.quantite', this.equipements.quantite)
      if (this.quantite < this.equipements.quantite) {
        this.presentToast("Quantité insifusante ", "danger")
      }
      else {
        this.api.AffecterEquipement(this.equipements).then(d => {
          this.modalController.dismiss();
          this.presentToast('Equipement Reaffecté avec succes', "success");
        })
      }


    }
  }
  async presentToast(msg: string, color: string) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  proprietaires = []
  getProprietaire() {
    this.api.getProprietaire().then(d => {
      let data = JSON.parse(d.data);
      this.proprietaires = data.proprietaire;
      console.log("proprietaires", this.proprietaires);
    })
  }

  closeModal() { this.modalController.dismiss(); }

}
