import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';

import { NavController, ToastController, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
//import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detailconge-confirmation',
  templateUrl: './detailconge-confirmation.page.html',
  styleUrls: ['./detailconge-confirmation.page.scss'],
})
export class DetailcongeConfirmationPage implements OnInit {
  myId = null;
  currentUser;
  userDetail;
  commentaire
  conge;
  env=environment.pathavatar;


  constructor(public menuCtrl: MenuController,private activatedRoute: ActivatedRoute,private api: RestapiService,private nav: NavController,public toastController: ToastController,
    //public firestore: AngularFirestore,
     private storage: Storage ,private authService: AuthtificationtokenService) { this.menuCtrl.enable(true);}






  public traiterdemande(msg){
      this.api.ConfirmerDemande(msg,this.myId,this.conge.personnel.user.tokenFireBase,this.commentaire);
    //  this.api.reponsenotification(this.conge.personnel.token,this.currentUser.prenom,msg);


     

  }


  

  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
    this.storage.get('currentUser').then((val) => { this.currentUser=val;});
    this.api.getDemandeCongeById(this.myId).then(data => {
        
      this.conge= JSON.parse(data.data);
      console.log("----------------");
      console.log(this.conge);
      console.log("----------------");
    });

  }
  logout(){
    this.authService.logout();
  }
}
