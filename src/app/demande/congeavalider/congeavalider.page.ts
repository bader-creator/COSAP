import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController, MenuController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';

@Component({
  selector: 'app-congeavalider',
  templateUrl: './congeavalider.page.html',
  styleUrls: ['./congeavalider.page.scss'],
})
export class CongeavaliderPage implements OnInit {
  demandeCongeEnCours;
  demandeSortieEnCours;
  currentUser;
  env = environment.pathavatar;
  segment = "conge";

  constructor(public menuCtrl: MenuController,
    private api: RestapiService, private storage: Storage, public navCtrl: NavController, public loadingController: LoadingController, private authService: AuthtificationtokenService
  ) {

  }

  ngOnInit() {

  }



  ionViewWillEnter() {

    console.log("ionViewWillEnter enattente");
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val;
      this.listDemandeCongeEnCoursParSuperieur();
      this.listDemandeSortieEnCoursParSuperieur();
      this.listDemandeTeleTravailEnCoursParSuperieur()

    });


  }

  public logout() {
    this.authService.logout();
  }

  listDemandeCongeEnCoursParSuperieur() {
    this.api.listDemandeCongeEnCoursParSuperieur(this.currentUser.id).then(data => {

      this.demandeCongeEnCours = JSON.parse(data.data);
    });;
  }


  listDemandeSortieEnCoursParSuperieur() {
    this.api.listDemandeSortieEnCoursParSuperieur(this.currentUser.id).then(data => {

      this.demandeSortieEnCours = JSON.parse(data.data);
    });
  }

  demandeTeletravailEncours
  listDemandeTeleTravailEnCoursParSuperieur() {
    this.api.listDemandeTeleTravailEnCoursParSuperieur(this.currentUser.id).then(d => {
      let data = JSON.parse(d.data);
      this.demandeTeletravailEncours = data.teletravail;
      console.log("teletravail", this.demandeTeletravailEncours);
    })
  }










  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
