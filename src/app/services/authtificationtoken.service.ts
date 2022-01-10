import { Injectable } from '@angular/core';

import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Entity } from '../pages/Entity';
import { HTTP } from '@ionic-native/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class AuthtificationtokenService {
  IdUser = '';
  url = environment.url;
  user = null;
  comex
  token = "";
  authenticationState = new BehaviorSubject(false);
  supervision
  constructor(private helper: JwtHelperService, private storage: Storage, private nav: NavController, public loadingController: LoadingController, private toastController: ToastController, private http2: HTTP) {

  }

  ngOnInit() {

  }

  roles
  Stagiaire
  sfmCameroun
  checkToken() {

    this.storage.get('token').then((val) => {
      console.log('Your token is', val);
      let decoded = this.helper.decodeToken(val);
      let isExpired = this.helper.isTokenExpired(val);
      if (!isExpired) {
        this.user = decoded;
        console.log('decoded', decoded)

        this.token = val;
        console.log('token', this.token)
        this.roles = decoded.roles;
        this.roles.forEach(element => {
          if (element == "ROLE_STAGIAIRE")
            this.Stagiaire = element;
          else if (element == "ROLE_GUEST")
            this.Guest = element;
          else if (element == "ROLE_SFM_CAMEROUN")
            this.sfmCameroun = element;

        });


        this.nav.navigateForward(`/home`);

      } else {
        this.storage.remove('token');
        this.nav.navigateForward(`/login`);
      }

    });

  }



  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


  loading;
  async loadingFn() {
    this.loading = await this.loadingController.create({ message: "Connexion ..." });
    this.loading.present();
  }

  async dismissFn() {
    // console.log("dismiss");
    await this.loading.dismiss();
  }





  Guest
  decode
  login(credentials) {
    this.loadingFn();

    this.http2.post(`${environment.url}/login_check`, credentials, { 'Content-Type': 'application/json' }).then(data => {

      let res = JSON.parse(data.data)
      console.log("ress", res);
      if (res['soldePersonnel'] == false) {
        this.token = res['token'];
        let currentUser = new Entity().personnel;
        this.IdUser = res['data'].id;
        this.comex = res['data'].comex;
        currentUser.path = res['data'].path;
        let supercurrentUser = new Entity().personnel;
        let infoSolde = new Entity().infoSolde;
        console.log('tokennnnnn', this.token)
        this.storage.set('token', this.token);
        this.storage.set('iduser', this.IdUser);
        this.storage.set('comex', this.comex);
        console.log('comex', this.comex);
        this.storage.set('currentUser', currentUser);
        console.log('currentUser', currentUser)
        this.storage.set('currentSuperUser', supercurrentUser);
        this.storage.set('infoSolde', infoSolde);
      }
      else {
        this.token = res['token'];
        console.log('tokennnnnnelse', this.token)
        console.log("ressselse", res);
        let currentUser = new Entity().personnel;
        this.IdUser = res['data'].id;
        this.comex = res['data'].comex;
        console.log('comexelse', this.comex);
        currentUser = res['soldePersonnel'].personnel;
        currentUser.path = res['data'].path;

        let supercurrentUser = new Entity().personnel;
        supercurrentUser = res['soldePersonnel'].personnel.superieur;
        let infoSolde = new Entity().infoSolde;
        infoSolde = res['soldePersonnel'];

        console.log('sttetet', this.Stagiaire);
        this.storage.set('token', this.token);
        this.storage.set('iduser', this.IdUser);
        this.storage.set('comex', this.comex);
        this.storage.set('currentUser', currentUser);
        console.log('currentUseelse', currentUser)
        this.storage.set('currentSuperUser', supercurrentUser);
        this.storage.set('infoSolde', infoSolde);
      }



      this.dismissFn();

      this.nav.navigateForward(`/home`);


    }).catch(error => {
      this.presentToast("Login ou mot de passe invalide");
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
      this.dismissFn();
    });



  }





  logout() {
    this.token = "";
    this.storage.remove('token');
    this.storage.remove('currentSuperUser');
    this.storage.remove('currentUser');
    this.storage.remove('comex');
    this.storage.remove('infoSolde');
    this.storage.remove('iduser');


    this.nav.navigateForward(`/login`);
  }




  public getToken() {
    return this.token;
  }


}
