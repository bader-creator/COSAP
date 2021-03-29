import { Component} from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import {  ToastController, LoadingController, AlertController, MenuController } from '@ionic/angular';
import 'moment-timezone';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.page.html',
  styleUrls: ['./add-news.page.scss'],
})
export class AddNewsPage{
 
  quote={
  "published":new Date().toISOString(),
  "content":"",
  "title":"",
  "type":"Quote",
  "personnel_id":""
  }

    constructor(public menuCtrl: MenuController,
      private storage: Storage  ,
      private api: RestapiService,
      private toastController: ToastController,
      public loadingController: LoadingController,
      public alertController: AlertController,
      ) {
        this.menuCtrl.enable(true);

      }



   CreeNews(){ 
     this.api.addNews(this.quote);
    }




ionViewWillEnter(){

       this.storage.get('currentUser').then((val) => {this.quote.personnel_id=val.id; });
}

}