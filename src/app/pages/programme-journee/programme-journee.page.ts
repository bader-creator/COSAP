import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestapiService } from 'src/app/services/restapi.service';

@Component({
  selector: 'app-programme-journee',
  templateUrl: './programme-journee.page.html',
  styleUrls: ['./programme-journee.page.scss'],
})
export class ProgrammeJourneePage implements OnInit {

  constructor(private storage: Storage, private api: RestapiService) { }
  currentUser
  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      console.log('this.currentsssUser', this.currentUser);
      this.Porgramme_Journee(this.currentUser);


    });
  }
  listActions
  listReunion
  Porgramme_Journee(iduser) {
    this.api.loadingFn()
    this.api.Porgramme_Journee(iduser).then(d => {
      let data = JSON.parse(d.data)
      console.log('data', data)
      this.listActions = data.TicketToDo
      this.listReunion = data.listeRenion
      console.log('listActions', this.listActions)
      console.log('listReunion', this.listReunion)
      this.api.dismissFn()
      this.api.presentToast("Opération effectuée");

    }).catch((error) => {
      this.api.dismissFn()
      this.api.presentToast("Erreur");
      console.log(error.status);
    });

  }

}
