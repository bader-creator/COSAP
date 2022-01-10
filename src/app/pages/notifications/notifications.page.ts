import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private storage: Storage, private nav: NavController, private modalCtrl: ModalController, private api: RestapiService) { }


  ngOnInit() {
    this.ListeAlerts()
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  doRefresh(event) {
    this.ListeAlerts()
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  Alerts = []
  ListeAlerts() {

    this.storage.get('notifications').then((val) => {

      this.Alerts = val

      console.log('Alerts', this.Alerts)


    });
  }

  reunion
  ConsulterNotif(data, index) {
    if (data.title == "Réunion") {
      this.api.NotifAlert(data.info, data.message).then(d => {
        this.modalCtrl.dismiss();
      })
    }

    if (data.title == "Rappel Bilan Quotidien") {
      this.api.showAlertBilan().then(d => {
        this.modalCtrl.dismiss();
      })
    }
    if (data.title == "Programme de la journée") {
      this.nav.navigateForward(`/programme-journee`);
      console.log('hellooooo')
    }
    if (data.info == "event") {
      this.nav.navigateRoot(`/list-reunion`).then(d => {
        this.modalCtrl.dismiss();
      })
    }
    if (data.title == "Demande de télétravail") {
      let message = data.message;
      this.api.ShowAlertDemandeTeletravail(message).then(d => {
        this.modalCtrl.dismiss();
      })
    }
    console.log('index', index)

    this.storage.get('notifications').then((val) => {
      console.log('vall', val)
      if (val) {
        console.log('index', index);
        if (index > -1) {
          val.splice(index, 1);
        }
        this.storage.set('notifications', val).then(d => {
          this.api.presentToast("Opération effectuée avec succès")
        })
      }

    });


  }

}
