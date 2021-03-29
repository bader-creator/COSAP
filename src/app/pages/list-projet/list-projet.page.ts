import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import {AuthtificationtokenService} from '../../services/authtificationtoken.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.page.html',
  styleUrls: ['./list-projet.page.scss'],
})
export class ListProjetPage implements OnInit {
  token
  decode
  roles
  Stagiaire
  currentUser
  Stagiaires
  constructor(public api:RestapiService,private storage:Storage,public nav:NavController,private auth:AuthtificationtokenService,private helper:JwtHelperService) { }

  ngOnInit() {
    this.token=this.auth.getToken();
    this.decode = this.helper.decodeToken(this.token);
    this.roles=this.decode.roles;
    this.roles.forEach(element => {
      if(element=="ROLE_STAGIAIRE")
      this.Stagiaire=element;
    });

    this.storage.get('currentUser').then((val) =>{
      this.currentUser=val.id;
      this.ListeProjetStagiaire(this.currentUser);
      this.ListProjetSelonEncadrant(this.currentUser);
      console.log('currentUser',this.currentUser);
    })
    this.get_project();
  }

  projets=[]
  get_project(){
    this.api.get_projet().then(d=>{
      let data=JSON.parse(d.data);
      this.projets=data.projet;
      console.log("projets",this.projets);
    })
  }

  godiscussion(id,type){
    this.nav.navigateRoot(`/discussion-projet/`+id+`/`+type);  
    console.log('id',id);
  }


  ListeProjetStagiaire(idStagiaire){
    this.api.ListeProjetStagiaire(idStagiaire).then(d=>{
      let data=JSON.parse(d.data);
      this.Stagiaires=data.listProjet;
      console.log('stagiaire',this.Stagiaires)
    })
  }
  ListeEncadrant
  ListProjetSelonEncadrant(idEncadrant){
    this.api.ListProjetSelonEncadrant(idEncadrant).then(d=>{
      let data =JSON.parse(d.data);
      this.ListeEncadrant=data.listProjet;
      console.log('ListeEncadrant',this.ListeEncadrant);
    })
  }
}
