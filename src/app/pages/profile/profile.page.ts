import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  currentUser;
  infoSolde;
  env=environment.pathavatar;

  constructor(public menuCtrl: MenuController,private api: RestapiService,private authService: AuthtificationtokenService,private storage: Storage) {
  
    this.menuCtrl.enable(true);
   }

  public logout(){
    this.authService.logout();
  }
 
  ngOnInit() {
 

  }

  ionViewWillEnter(){

   
    console.log("ionViewWillEnter profile");
   
    console.log(this.currentUser);

    this.storage.get('currentUser').then((val) => {
      console.log(this.currentUser)
      this.currentUser=val;

      this.api.getInfoSolde(val.id).then(data => {
        
        this.infoSolde= JSON.parse(data.data);
      });

    });
  


  }



}
