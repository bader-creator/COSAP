import { Component, OnInit } from '@angular/core';
import { AuthtificationtokenService } from '../../../app/services/authtificationtoken.service';
import { RestapiService } from '../../../app/services/restapi.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Storage } from '@ionic/storage';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import 'moment-timezone';
import * as moment from 'moment/moment.js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from 'src/app/app.component';
import { NotificationsPage } from '../notifications/notifications.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser;

  dashboard;
  token
  roles
  decode
  Stagiaire
  Guest
  sfmCameroun
  constructor(public app: AppComponent, private modalctrl: ModalController, public menuCtrl: MenuController, private helper: JwtHelperService, private authService: AuthtificationtokenService, private api: RestapiService, private fcm: FCM, private storage: Storage, private alert: AlertController) {

    this.menuCtrl.enable(true);

    this.token = this.authService.getToken();
    this.decode = this.helper.decodeToken(this.token);
    this.roles = this.decode.roles;
    this.roles.forEach(element => {
      if (element == "ROLE_STAGIAIRE")
        this.Stagiaire = element;

      else if (element == "ROLE_GUEST")
        this.Guest = element;

      else if (element == "ROLE_SFM_CAMEROUN")
        this.sfmCameroun = element;
    });
    app.Stagiaire = this.Stagiaire;
  }
  comex

  notifications
  ngOnInit() {
    /////////////////////////execute news/////////////////////////////////


    if (this.api.newsExterne.length === 0 || this.api.newsInterne.length === 0) {
      console.log('this.home.newsExterne', this.api.newsExterne)
      console.log('this.home.newsInterne', this.api.newsInterne)
      console.log('this news is vide')
      this.api.listNews()
      this.api.news()


    }
    this.listNews()


    //////////////////////////////////////////////////////////

    this.storage.get('comex').then((val) => {
      this.comex = val;
      console.log('comex', this.comex)
    })

    this.storage.get('currentUser').then((val) => {
      this.api.loadingFn()
      this.currentUser = val;
      this.listNumberGrh(this.currentUser.id)
      this.api.getInfoSolde(val.id).then(data => {

        let infotoken = JSON.parse(data.data);
        this.api.tokensuperuser = infotoken.tokenSuperieur;



      }).catch(e => {
        this.api.dismissFn()
      })


      this.api.dashboard(val.id).then(data => {


        this.dashboard = JSON.parse(data.data);

        this.api.dismissFn()

      }).catch(e => {
        this.api.dismissFn()
      })



      this.fcm.getToken().then(data => {
        console.log("mytokenfirebase: ", data);
        this.api.setTokenFireBase(this.currentUser.id, data);

      });

    });

  }
  CountGrh = []
  listNumberGrh(idUser) {

    this.api.listNumberGrh(idUser).then(d => {
      let data = JSON.parse(d.data);
      this.CountGrh = data;

      console.log('data', data);

    }).catch((error) => {

      this.api.presentToast("Erreur");
      console.log(error.status);
    });
  }

  async presentAlert() {
    const alert = await this.alert.create({
      subHeader: 'Attention!!',
      message: 'vous n\'avez pas l\'accès a ce module.',
      buttons: ['OK']
    });
    await alert.present();
  }



  logout() {
    this.authService.logout();
  }


  feedExterne
  intervalNewsInterne;
  intervalNewsExterne;
  feedInterne
  listNews() {
    let i = 0;
    let j = 0;
    this.intervalNewsInterne = setInterval(() => {
      if (i >= this.api.newsInterne.length) {
        i = 0;
      } else {

        this.feedInterne = this.api.newsInterne[i];
        i++;
      }
    }, 3000);




    this.intervalNewsExterne = setInterval(() => {
      if (j >= this.api.newsExterne.length) {
        j = 0;
      } else {

        this.feedExterne = this.api.newsExterne[j];
        j++;
      }
    }, 3000);
  }




  ionViewWillLeave() {
    clearInterval(this.intervalNewsExterne);
    clearInterval(this.intervalNewsInterne);
  }




  async GoesTONotifs() {
    const modal = await this.modalctrl.create({
      component: NotificationsPage,

    })
    modal.present();
  }

  async showNews(news) {



    const alert = await this.alert.create({
      header: news.title,

      message: news.content + "<br><span>" + moment(news.published).format('L') + " </span>",
      cssClass: 'alertCustomCss'
    });
    await alert.present();


  }


















}
