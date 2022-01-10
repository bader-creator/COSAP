import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment/moment.js';
import 'moment-timezone';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verifie-disponibilite',
  templateUrl: './verifie-disponibilite.page.html',
  styleUrls: ['./verifie-disponibilite.page.scss'],
})
export class VerifieDisponibilitePage implements OnInit {
  env = environment.pathavatar;
  constructor(private modalCtrl: ModalController) { }
  Presences
  datearray = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00']
  sortie = [];
  event = []


  timeStringToFloat(time) {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }
  ngOnInit() {
    this.Presences = this.Presences
    this.datearray.forEach(element => {
      this.sortie.push(false)
      this.event.push(false)
    });
    console.log('this.sortie', this.sortie)
    this.Presences.forEach(element => {
      if (element.demandeSorties.length != 0) {
        element.demandeSorties.forEach(s => {
          s.heureDebut = moment(s.heureDebut).format('HH:mm');
          s.heureFin = moment(s.heureFin).format('HH:mm');
          s.duree = Math.round(s.duree / 60);
          let index = this.datearray.indexOf(s.heureDebut);
          for (let i = index; i < s.duree + index; i++) {
            this.sortie[i] = true;
            console.log('this.sortie[i]', this.sortie[i])
          }
          s.sortie = this.sortie
        });
      }
      if (element.evenements && element.evenements.length != 0) {
        console.log('moment(element.evenements.debut).format()', moment(element.evenements.debut).format('HH:mm'))
        element.evenements.debut = moment(element.evenements.debut).format('HH:mm');
        element.evenements.fin = moment(element.evenements.fin).format('HH:mm');
        element.evenements.debut = Math.round(this.timeStringToFloat(element.evenements.debut)) + ":" + "00";
        element.evenements.fin = Math.round(this.timeStringToFloat(element.evenements.fin)) + ":" + "00";

        if (element.evenements.debut == element.evenements.fin) {
          element.evenements.duree = 1
          console.log('hello')
        } else {
          element.evenements.duree = Math.round(this.timeStringToFloat(element.evenements.fin)) - Math.round(this.timeStringToFloat(element.evenements.debut))
        }
        let hours = element.evenements.debut.split(':')
        console.log('hours', hours)
        console.log('hours[]length', hours['0'].length)
        if (hours['0'].length == 1) {
          element.evenements.debut = "0" + element.evenements.debut
        }
        console.log('element.evenements.debut2', element.evenements.debut)
        console.log('element.evenements.fin', element.evenements.fin)
        let index = this.datearray.indexOf(element.evenements.debut);
        console.log('index', index)
        for (let i = index; i < element.evenements.duree + index; i++) {
          this.event[i] = true;
          console.log('this.event[i]', this.event[i])
        }
        element.evenements.events = this.event
      }
    });
    console.log('this.Presences', this.Presences)
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }


}
