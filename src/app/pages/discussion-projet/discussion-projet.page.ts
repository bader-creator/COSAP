import { Component, OnInit, ViewChild } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from "@ionic/angular";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthtificationtokenService } from '../../services/authtificationtoken.service';


import * as $ from "jquery";
declare var $: $;

@Component({
  selector: 'app-discussion-projet',
  templateUrl: './discussion-projet.page.html',
  styleUrls: ['./discussion-projet.page.scss'],
})
export class DiscussionProjetPage implements OnInit {
  constructor(public api: RestapiService, private helper: JwtHelperService, private auth: AuthtificationtokenService, public storage: Storage, private activatedRoute: ActivatedRoute) {

  }
  container: HTMLElement;
  currentUser
  id_projet
  messagelNewsInterne
  ii
  interval
  currentlastname
  currentame
  type_Projet
  Type


  ngOnInit() {
    this.id_projet = this.activatedRoute.snapshot.paramMap.get('id');
    this.type_Projet = this.activatedRoute.snapshot.paramMap.get('type');
    console.log("id_projet", this.id_projet);
    console.log("type_Projet", this.type_Projet);
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      this.currentlastname = val.nom;
      this.currentame = val.prenom;
      //this.get_discussion();
      console.log("val", val)
      console.log("currentUser", this.currentUser);
      console.log("currentlastname", this.currentlastname);
      console.log("currentame", this.currentame);

    });




    this.ii = setInterval(() => {
      this.get_discussion();

    }, 2000);

  }
  ionViewWillLeave() {
    clearInterval(this.ii);
  }

  ngAfterViewInit() {
    //$('#div1').scrollTop($('#div1')[0].scrollHeight);
    //$("#div1").animate({ scrollTop: $('#div1').prop("scrollHeight")}, 1000);
  }


  newMessage: any;
  message = {
    "newMessage": "",
  }
  nom: any
  prenom: any
  async sendMessage() {
    console.log('id_projet', this.id_projet);
    this.api.post_message(this.message, this.id_projet, this.currentUser, this.type_Projet)
      .subscribe((data: any) => {
        this.messages.forEach(element => {
          if (this.currentUser == element.personnel_sender.id) {
            this.nom = element.personnel_sender.nom
            this.prenom = element.personnel_sender.prenom

          }
        });

        this.messages.push({
          created: "2019-10-20T10:20:20",
          message: this.message.newMessage,

          personnel_sender: { id: this.currentUser, nom: this.currentlastname, prenom: this.currentame },


        });


        $(".msg_card_body").stop().animate({ scrollTop: $(".msg_card_body")[0].scrollHeight }, 2000);

        this.resetView();


      })

  }

  resetView() {
    this.message = {
      "newMessage": "",
    }
  }

  messages = []

  get_discussion() {


    this.api.get_message(this.id_projet, this.currentUser, this.type_Projet).then(d => {
      let data = JSON.parse(d.data);
      this.messages = data.message;

      console.log("messages", this.messages);


    })

  }








}
