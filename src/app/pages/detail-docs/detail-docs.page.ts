import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../services/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detail-docs',
  templateUrl: './detail-docs.page.html',
  styleUrls: ['./detail-docs.page.scss'],
})
export class DetailDocsPage implements OnInit {
  document={"commentaire":"","etat":1,"id":null}
  currentUser
  constructor(private api:RestapiService,private storage:Storage,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
  }
  idDocs
  env=environment.urlupload;
  ionViewWillEnter(){
    this.idDocs = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("this.idDocs",this.idDocs)
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      console.log("currentUser",this.currentUser)
    });
    console.log("this.currentUser",this.currentUser)
    this.Mesdocuments(this.idDocs)

  }

  MesDocuments=[];
  Mesdocuments(idDocs){
   
    this.api.GetDetailDocs(idDocs).then(d=>{
      let data=JSON.parse(d.data);
      this.MesDocuments=data.detail;
      console.log("this.MesDocuments",this.MesDocuments)
    })
  }
  verifeChamp=false;
  validerDocs(){
    this.verifeChamp=true;
    this.document={"commentaire":this.document.commentaire,"etat":1,"id":this.idDocs}
    if(this.document.commentaire){
      this.verifeChamp=false;
      this.api.ValiderDocs(this.document);
    }
   
  }
  RefuserDocs(){
    this.verifeChamp=true;
    this.document={"commentaire":this.document.commentaire,"etat":0,"id":this.idDocs}
    if(this.document.commentaire){
    this.verifeChamp=false;
    this.api.RefuserDocs(this.document);
    }
  }
}
