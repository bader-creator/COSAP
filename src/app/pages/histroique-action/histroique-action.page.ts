import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../../app/services/restapi.service';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-histroique-action',
  templateUrl: './histroique-action.page.html',
  styleUrls: ['./histroique-action.page.scss'],
})
export class HistroiqueActionPage implements OnInit {
  id
  idactionProg
  idactionSpon
  historique
  env = environment.pathfile;
  detail
  constructor(private api: RestapiService, private modalctrl: ModalController) { }

  ngOnInit() {
    this.id = this.idactionProg
    this.idactionSpon = this.idactionSpon
    this.historique = this.historique
    this.detail = this.detail;
    console.log('historique', this.historique)
    console.log('detail', this.detail)
    console.log('idactionSpon', this.idactionSpon)
    this.HistoriqueTeleTravailParAction(this.id);
    this.DetailActionSpontanee(this.idactionSpon)
  }

  Historique
  HistoriqueTeleTravailParAction(id) {
    this.api.HistoriqueTeleTravailParAction(id).then(d => {
      let data = JSON.parse(d.data);
      this.Historique = data.listAction
      console.log('Historique', this.Historique)
    })
  }
  Detail
  DetailActionSpontanee(id) {
    this.api.DetailActionSpontanee(id).then(d => {
      let data = JSON.parse(d.data);
      this.Detail = data.listAction
      console.log('Detail', this.Detail)
    })
  }

  onDismiss() {
    this.modalctrl.dismiss();
  }
}
