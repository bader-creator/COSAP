import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
import { LoadingController, MenuController } from '@ionic/angular';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';
import 'moment-timezone';
import * as moment from 'moment/moment.js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-historiqueconge',
  templateUrl: './historiqueconge.page.html',
  styleUrls: ['./historiqueconge.page.scss'],
})
export class HistoriquecongePage implements OnInit {
  historique;
  historiquesortie;
  env=environment.pathavatar;

  constructor(private api: RestapiService,private storage: Storage,public menuCtrl: MenuController,
    public loadingController: LoadingController, private authService: AuthtificationtokenService) {
      api.back();
      this.menuCtrl.enable(true);
     }

  ngOnInit() {
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter historique");
    this.getInfoList();
  }


  currentUser;
  getInfoList(){

    this.storage.get('currentUser').then((val) => {
      this.currentUser=val;
     }).then(val=>{
      this.api.getDemandeCongeByIdPersonnel(this.currentUser.id).then(data => {
        let listConges= JSON.parse(data.data);

/*

        listConges.forEach(element => {
          element.dateDebutConge.date = new Date(moment(element.dateDebutConge.date+"").format('YYYY-MM-DD'));
          element.dateFinConge.date= new Date(moment(element.dateFinConge.date+"").format('YYYY-MM-DD'));

        });
*/
        this.historique=listConges;

      }).then(val=>{
        this.api.getDemandeSortieByIdPersonnel(this.currentUser.id).then(data => {

          let listSortie= JSON.parse(data.data);
/*
          listSortie.forEach(element => {

            element.dateDebutConge.date =new Date(moment(element.dateSortie.date+"").format('YYYY-MM-DD')) ;


          });
*/

          this.historiquesortie= listSortie;
        });

      });


     });

  }
  logout(){
    this.authService.logout();
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
