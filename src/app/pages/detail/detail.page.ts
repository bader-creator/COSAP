import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  myId = null;
  conge;
  env=environment.pathavatar;
  
  currentUser;

  constructor(public menuCtrl: MenuController,private activatedRoute: ActivatedRoute,private api: RestapiService, private authService: AuthtificationtokenService,private storage: Storage) { this.menuCtrl.enable(true);}

   ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.currentUser=val;
     })
   
    this.myId = this.activatedRoute.snapshot.paramMap.get('id');
  
     this.api.getDemandeCongeById(this.myId).then(data => {
        
      this.conge= JSON.parse(data.data);


      console.log(this.conge)
    });






 
  }
  logout(){
    this.authService.logout();
  }

  
  public traiterdemande(msg){
    this.api.SuppressionDemandeConge(msg,this.myId,this.conge.personnel.superieur.user.tokenFireBase);
}


}
