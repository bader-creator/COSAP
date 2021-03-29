import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-equipement-by-group',
  templateUrl: './equipement-by-group.page.html',
  styleUrls: ['./equipement-by-group.page.scss'],
})
export class EquipementByGroupPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  GoToList(type) {
    console.log('type', type)
    this.nav.navigateRoot(`/mes-equipement/` + type);
  }
}
