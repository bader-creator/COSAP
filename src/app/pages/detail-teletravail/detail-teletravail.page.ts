import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detail-teletravail',
  templateUrl: './detail-teletravail.page.html',
  styleUrls: ['./detail-teletravail.page.scss'],
})
export class DetailTeletravailPage implements OnInit {
  idteletravail
  env = environment.pathavatar;
  constructor(private api: RestapiService, private alertController: AlertController, private storage: Storage, private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.idteletravail = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('idteletravail', this.idteletravail)
    this.DetailTeleTravail(this.idteletravail);



  }
  detailTeleTravail
  DetailTeleTravail(id) {
    this.api.DetailTeleTravail(id).then(d => {
      let data = JSON.parse(d.data);
      this.detailTeleTravail = data.detailTeleTravail;
      console.log('detailTeleTravail', this.detailTeleTravail)
    })
  }


  async AlertValiderdemande() {
    const alert = await this.alertController.create({
      message: 'Vous voulez valider la  Demande ?',
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
            this.api.Validerdemande(this.idteletravail);
          }
        }
      ]
    });

    await alert.present();
  }

  async AlertAnnulerdemande() {
    const alert = await this.alertController.create({
      message: 'Vous voulez annuler la  Demande ?',
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
            this.api.Annulerdemande(this.idteletravail);
          }
        }
      ]
    });

    await alert.present();
  }

}
