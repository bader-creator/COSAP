import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';

import { Storage } from '@ionic/storage';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';
import { environment } from '../../../environments/environment';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-detail-demande-sortie',
  templateUrl: './detail-demande-sortie.page.html',
  styleUrls: ['./detail-demande-sortie.page.scss'],
})
export class DetailDemandeSortiePage implements OnInit {
  myId = null;
  demandesortie;
  env=environment.pathavatar;

  
  currentUser;
  
  constructor(public menuCtrl: MenuController,private activatedRoute: ActivatedRoute,private api: RestapiService,private storage: Storage, private authService: AuthtificationtokenService) { 

    this.menuCtrl.enable(true);



  }



  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.currentUser=val;
     })
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
  
     this.api.getDemandeSortieById(this.myId).then(data => {
        
      this.demandesortie= JSON.parse(data.data);
  
      console.log(this.demandesortie);
    });

  }
  logout(){
    this.authService.logout();
  }



  public traiterdemande(msg){
    this.api.SuppressionDemandeSortie(msg,this.myId,this.demandesortie.personnel.superieur.user.tokenFireBase);
    

}






}
