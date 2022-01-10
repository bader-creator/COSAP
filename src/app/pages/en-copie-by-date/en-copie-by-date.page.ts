import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestapiService } from 'src/app/services/restapi.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-en-copie-by-date',
  templateUrl: './en-copie-by-date.page.html',
  styleUrls: ['./en-copie-by-date.page.scss'],
})
export class EnCopieByDatePage implements OnInit {
  date = new Date()
  constructor(private modalCtrl: ModalController, private storage: Storage, private api: RestapiService) { }
  idUser
  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.idUser = val.id
      console.log('iduser', this.idUser)

    });
  }
  TaskEnCopie() {
    console.log('this.date', this.date)
    console.log('this.idUser', this.idUser)
    this.modalCtrl.dismiss();
    this.api.GetEnCopie(this.idUser, this.date);
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

}
