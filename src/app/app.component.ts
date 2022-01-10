import { Component } from '@angular/core';
import { Platform, ToastController, NavController, MenuController } from '@ionic/angular';
import { AuthtificationtokenService } from './services/authtificationtoken.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Storage } from '@ionic/storage';
import { environment } from '../environments/environment';
import { RestapiService } from './services/restapi.service';
import 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})

export class AppComponent {
  env = environment.pathavatar;
  User
  dateRelanceBilan = new Date()
  constructor(
    private nav: NavController,
    private platform: Platform,
    public authService: AuthtificationtokenService,
    private fcm: FCM,
    public toastController: ToastController,
    private storage: Storage,
    public menuCtrl: MenuController,
    private api: RestapiService,

  ) {

    this.initializeApp();
  }

  logout() {
    this.authService.logout();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  idreunion
  Stagiaire
  reunion
  message
  notifications = []
  initializeApp() {
    console.log('redirection to AppCOMponet');


    this.platform.ready().then(() => {
      this.authService.checkToken();
      this.api.DeleteNews()
      this.storage.get('currentUser').then((val) => {
        this.User = val
        console.log('usercomponent', this.User)
      });

      this.fcm.onNotification().subscribe(data => {
        console.log('datafcm', data)
        this.storage.get('notifications').then((val) => {
          if (val) {
            val.forEach(element => {
              this.notifications.push(element)
            });
          }
          if (data) {
            this.notifications.push(data)
          }
          this.storage.set('notifications', this.notifications);
          console.log('notificationsTabs', this.notifications)
        });

        if (data.wasTapped) {
          if (data.title == "Réunion") {
            this.reunion = data.info;
            this.message = data.message;
            console.log('reunion', this.reunion)
            console.log('message', this.message)
            this.api.NotifAlert(this.reunion, this.message);

          }
          else {
            this.nav.navigateRoot(data.info)
          }

        } else {
          this.presentToast(data.title);
        }

        if (data.wasTapped) {
          if (data.title == "Rappel Bilan Quotidien") {
            this.api.showAlertBilan();
          }
          else {
            this.presentToast(data.title);
          }
          if (data.title == "Programme de la journée") {
            this.nav.navigateForward(`/programme-journee`);
            console.log('hellooooo')
          }
          else {
            this.presentToast(data.title);
          }
        }
        if (data.wasTapped) {
          if (data.info == "event") {
            this.nav.navigateRoot(`/list-reunion`);
          }
        }
        else {
          this.presentToast(data.title);
        }


        if (data.wasTapped) {
          if (data.title == "Demande de télétravail") {
            let message = data.message;
            this.api.ShowAlertDemandeTeletravail(message);
          }

        }
        else {
          this.presentToast(data.title);
        }

      });

    });


  }

  toggleMenu() {
    this.menuCtrl.toggle(); //Add this method to your button click function
  }




}
