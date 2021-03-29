import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestapiService } from 'src/app/services/restapi.service';
import { NavController, ToastController, Platform, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { AuthtificationtokenService } from 'src/app/services/authtificationtoken.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mes-equipement',
  templateUrl: './mes-equipement.page.html',
  styleUrls: ['./mes-equipement.page.scss'],
})
export class MesEquipementPage implements OnInit {
  currentUser;
  roles = [];
  token
  decoded
  assets
  type
  segment = "mesequipement";
  constructor(public storage: Storage, private activatedRoute: ActivatedRoute, private helper: JwtHelperService, private authService: AuthtificationtokenService, public api: RestapiService, public nav: NavController, public AlertController: AlertController, public toastController: ToastController) { }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    console.log('this.type', this.type)
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      this.getMesEquipements(this.currentUser);
      this.getEquipements(this.currentUser);

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
    });




  }
  FilterByGroupe() {
    if (this.type && this.type.trim() != '') {
      this.equipements = this.equipements.filter((location) => {
        if (location.type != null)
          return location.type.toLowerCase().indexOf(this.type.toLowerCase()) > -1;
      })
    }
    console.log('this.equipements', this.equipements)
    if (this.type && this.type.trim() != '') {
      this.Mesequipements = this.Mesequipements.filter((location) => {
        if (location.type != null)
          return location.type.toLowerCase().indexOf(this.type.toLowerCase()) > -1;
      })
    }
    console.log('this.Mesequipements', this.Mesequipements)
  }
  equipements
  getEquipements(iduser) {
    this.api.getEquipements(iduser).then(d => {
      let data = JSON.parse(d.data);
      this.equipements = data.equipements;
      console.log('Mesequipements', this.equipements);
      this.FilterByGroupe()
    })
  }

  Mesequipements
  getMesEquipements(iduser) {
    this.api.getMesEquipements(iduser).then(d => {
      let data = JSON.parse(d.data);
      this.Mesequipements = data.mesequipements;
      console.log('Mesemprunts', this.Mesequipements);
      this.FilterByGroupe()
    })
  }

  godetail(id, quantite) {
    this.nav.navigateRoot(`/detail-equipement/` + id + `/` + quantite);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async Confirmer(id, tracibilite) {

    const alert = await this.AlertController.create({
      header: 'Confirm!',
      message: ' Etes-vous sur de vouloir Confirmer cet Equipement',
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
            this.api.ConfirmerEquipement(id, tracibilite).then(d => {
              this.presentToast('Equipement Confirmé avec succes');
              this.getMesEquipements(this.currentUser);
              this.getEquipements(this.currentUser);

            })
          }
        }
      ]
    });

    await alert.present();
  }

  async Annuler(idtraciblite) {

    const alert = await this.AlertController.create({
      header: 'Confirm!',
      message: ' Etes-vous sur de vouloir Annuler cet Equipement',
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
            this.api.AnnulerEquipement(idtraciblite).then(d => {
              this.presentToast('Equipement Annulé avec succes');

              this.getMesEquipements(this.currentUser);
              this.getEquipements(this.currentUser);
            })
          }
        }
      ]
    });

    await alert.present();

  }

  async Render(idtracibilte) {

    const alert = await this.AlertController.create({
      header: 'Confirm!',
      message: ' Etes-vous sur de vouloir Rendre cet Equipement',
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
            this.api.RenderEquipement(idtracibilte).then(d => {
              this.presentToast('Equipement a Rendu avec succes');

              this.getMesEquipements(this.currentUser);
              this.getEquipements(this.currentUser);
            })
          }
        }
      ]
    });

    await alert.present();

  }
  async AnnulerREnder(idtracibilte) {

    const alert = await this.AlertController.create({
      header: 'Confirm!',
      message: ' Etes-vous sur de vouloir Annuler l\'action',
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
            this.api.AnnulerRenderEquipement(idtracibilte).then(d => {
              this.presentToast('Equipement Annulé avec succes');

              this.getMesEquipements(this.currentUser);
              this.getEquipements(this.currentUser);
            })
          }
        }
      ]
    });

    await alert.present();

  }

  async ConfirmerREnder(id, idtraciblite) {

    const alert = await this.AlertController.create({
      header: 'Confirm!',
      message: ' Etes-vous sur de vouloir Confirmer l\'action',
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
            this.api.ConfirmerRenderEquipement(id, idtraciblite).then(d => {
              this.presentToast('Equipement a Rendu avec succes');

              this.getMesEquipements(this.currentUser);
              this.getEquipements(this.currentUser);
            })
          }
        }
      ]
    });

    await alert.present();

  }
}
