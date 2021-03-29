import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from './../../services/restapi.service';
import { Observable } from 'rxjs';
//import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';
import { environment } from '../../../environments/environment';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-detailsortie-confirmation',
  templateUrl: './detailsortie-confirmation.page.html',
  styleUrls: ['./detailsortie-confirmation.page.scss'],
})
export class DetailsortieConfirmationPage implements OnInit {


  myId = null;
  demandesortie;
  currentUser;
  env=environment.pathavatar;
  
  constructor(public menuCtrl: MenuController,private activatedRoute: ActivatedRoute,private api: RestapiService,
  //  public firestore: AngularFirestore,
     private storage: Storage, private authService: AuthtificationtokenService) {this.menuCtrl.enable(true); }

  public traiterdemande(msg){
    this.api.ConfirmerDemandeSortie(msg,this.myId,this.demandesortie.personnel.user.tokenFireBase);
	console.log(this.demandesortie.personnel.token);
  console.log(this.currentUser.prenom);
  
 

	
   // this.api.reponsenotification(this.demandesortie.personnel.token,this.currentUser.prenom,msg);
}



  ngOnInit() {
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
  
    this.storage.get('currentUser').then((val) => { this.currentUser=val;});
     this.api.getDemandeSortieById(this.myId).then(data => {
      
      this.demandesortie= JSON.parse(data.data);
      console.log(this.demandesortie);
    });

  }

  logout(){
    this.authService.logout();
  }
}
