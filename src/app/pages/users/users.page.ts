import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { environment } from '../../../environments/environment';
import { appInitialize } from '@ionic/angular/dist/app-initialize';
import { ActivatedRoute } from '@angular/router';

import { NavController, MenuController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  segment = "personnel";
  public users;
  public userssearch;
  public tasksUser;
  env = environment.pathavatar;
  idSelect

  userSelected
  userCC

  constructor(public menuCtrl: MenuController, private api: RestapiService, private navCtrl: NavController, private activatedRoute: ActivatedRoute, public modalCtrl: ModalController) {
    this.menuCtrl.enable(true);
    console.log("user")
  }

  ngOnInit() {
    this.ChargeUser()
  }


  charges = []
  ChargeUser() {
    this.api.getCharge().then(d => {
      console.log("charges", d);
      //  let data=JSON.parse(d.data);

      // this.charges=data.ticket
      //
      //    console.log("charges", this.charges);
    })
  }


  userselect(user) {

    console.log("spec", this.spec)
    if (this.spec == 1) {
      console.log("user selected")
      this.userSelected = user;
    }
    else {
      console.log("user cc")
      this.userCC = user;
    }
    this.onDismiss();
  }

  stagiaires
  spec
  StagiaireSearch
  cameroun
  camerounSearch
  guest
  guestSearch
  ionViewWillEnter() {


    this.spec = this.idSelect;
    this.api.getPersonnels().then(d => {
      let data = JSON.parse(d.data)
      console.log('datatatat', data)
      this.users = data.personnels;
      this.userssearch = data.personnels;
      this.stagiaires = data.stagiaires;
      this.StagiaireSearch = data.stagiaires;
      this.cameroun = data.cameroun;
      this.camerounSearch = data.cameroun;

      console.log('stgiaire', this.stagiaires);
      console.log('userssearch', this.userssearch)
      console.log('StagiaireSearch', this.StagiaireSearch)
      console.log('cameroun', this.cameroun)
      console.log('camerounSearch', this.camerounSearch)


    });





  }




  onKey(event: any) {
    this.userssearch = this.users;
    let state = true;
    for (let key in this.users) {
      let value = this.users[key];
      if (value.email.toUpperCase().indexOf(event.target.value.toUpperCase()) >= 0) {
        console.log(value);
        if (state == true) {
          this.userssearch = [];
          state = false;
        }
        this.userssearch.push(value);
        console.log(this.userssearch)
      }
    }
  }
  onSearchStagaire(event: any) {
    this.StagiaireSearch = this.stagiaires;
    let state = true;
    for (let key in this.stagiaires) {
      let value = this.stagiaires[key];
      if (value.email.toUpperCase().indexOf(event.target.value.toUpperCase()) >= 0) {
        console.log(value);
        if (state == true) {
          this.StagiaireSearch = [];
          state = false;
        }
        this.StagiaireSearch.push(value);
        console.log(this.StagiaireSearch)
      }
    }
  }
  onSearchuserCameroun(event: any) {
    this.camerounSearch = this.cameroun;
    let state = true;
    for (let key in this.cameroun) {
      let value = this.cameroun[key];
      if (value.email.toUpperCase().indexOf(event.target.value.toUpperCase()) >= 0) {
        console.log(value);
        if (state == true) {
          this.camerounSearch = [];
          state = false;
        }
        this.camerounSearch.push(value);
        console.log(this.camerounSearch)
      }
    }
  }







  onDismiss() {
    this.modalCtrl.dismiss({ userSelected: this.userSelected, userCC: this.userCC });

  }




}
