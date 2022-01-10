import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { ToastController, AlertController, Platform, NavController, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { AuthtificationtokenService } from 'src/app/services/authtificationtoken.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { AffecterEquipementPage } from '../affecter-equipement/affecter-equipement.page'
import { ListDestinataireEquipementPage } from '../list-destinataire-equipement/list-destinataire-equipement.page';

@Component({
  selector: 'app-detail-equipement',
  templateUrl: './detail-equipement.page.html',
  styleUrls: ['./detail-equipement.page.scss'],
})
export class DetailEquipementPage implements OnInit {
  id_equipement;
  quantite;
  id_destination;
  currentUser;
  roles = [];
  token
  decoded
  assets
  env = environment.pathfile;
  constructor(public activatedRoute: ActivatedRoute, private alertCtrl: AlertController, private modalctrl: ModalController, private storage: Storage, private helper: JwtHelperService, public authService: AuthtificationtokenService, public AlertController: AlertController, public api: RestapiService, public ToastController: ToastController, public nav: NavController) { }

  ngOnInit() {
    this.id_equipement = this.activatedRoute.snapshot.paramMap.get('id');
    this.quantite = this.activatedRoute.snapshot.paramMap.get('quantite');
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      console.log('cureent', this.currentUser)

    });
    this.getDetail(this.id_equipement);


    this.token = this.authService.getToken();
    this.decoded = this.helper.decodeToken(this.token);
    this.roles = this.decoded.roles;
    this.roles.forEach(element => {
      if (element == "ROLE_AJOUTER_ASSET")
        this.assets = element;

    });
    console.log("roles", this.roles)
    console.log("decoded", this.decoded)
    console.log("assets", this.assets)

  }

  async presentToast(msg: string) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  detail = []
  traciblite = []
  getDetail(id) {
    this.api.getDetailEquipement(id).then(d => {
      let data = JSON.parse(d.data);
      this.detail = data.detail;
      console.log("this.detail", this.detail)
      this.detail.forEach(element => {
        this.traciblite = element.traciblite;
        console.log('traciblite', this.traciblite)
        this.id_destination = element.destinataire.id;

      });
      console.log("this.id_destination", this.id_destination)

    })

  }

  async DeleteEquipement() {

    const alert = await this.AlertController.create({
      header: 'Confirm!',
      message: ' Etes-vous sur de vouloir supprimer cet Equipement',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            this.api.DeleteEquipement(this.id_equipement).then(d => {
              this.presentToast('Equipement Supprimé avec succes');
              this.nav.navigateRoot(`/mes-equipement`);

            })
          }
        }
      ]
    });

    await alert.present();

  }

  async ListDestinatiare() {
    const modal = await this.modalctrl.create({
      component: ListDestinataireEquipementPage,
      componentProps: {
        tracibilte: this.traciblite,

      }
    })
    modal.present();
  }

  async AffecterEquipement() {
    console.log('quantite', this.quantite)
    const modal = await this.modalctrl.create({
      component: AffecterEquipementPage,
      cssClass: 'affectEquipement',
      componentProps: {
        id_equipement: this.id_equipement,
        quantite: this.quantite

      }
    })
    modal.present();
  }
  data = { "id": null, "type": null }
  async ChangeType(id) {
    let alert = await this.alertCtrl.create({
      header: 'Changer le Type',
      inputs: [
        {
          name: 'D2S',
          type: 'radio',
          label: 'D2S',
          value: 'D2S',
          checked: true
        },
        {
          name: 'Gadget',
          type: 'radio',
          label: 'Gadget',
          value: 'Gadget'
        },
        {
          name: 'M.Informatique',
          type: 'radio',
          label: 'Informatique',
          value: 'Informatique'
        },
        {
          name: 'Télephones',
          type: 'radio',
          label: 'Telephones',
          value: 'Telephones'
        },
        {
          name: 'Bureautique',
          type: 'radio',
          label: 'Bureautique',
          value: 'Bureautique'
        },
        {
          name: 'Divers',
          type: 'radio',
          label: 'Divers',
          value: 'Divers'
        },
        {
          name: 'Mobilier',
          type: 'radio',
          label: 'Mobilier',
          value: 'Mobilier'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: type => {
            console.log('type', type)
            this.data.type = type;
            this.data.id = this.id_equipement;
            console.log('this.data', this.data)
            this.api.ChangeType(this.data);
          }
        }
      ]
    });
    alert.present();
  }


  async ToastDanger(msg: string, color: string) {
    const toast = await this.ToastController.create({
      message: msg,
      duration: 5000,
      color: color,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
  }

}
