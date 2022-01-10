import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController, AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-liste-documents',
  templateUrl: './liste-documents.page.html',
  styleUrls: ['./liste-documents.page.scss'],
})
export class ListeDocumentsPage implements OnInit {

  constructor(private api:RestapiService,private storage:Storage,private nav:NavController,private alert:AlertController) { }
  currentUser
  ngOnInit() {
 
  }
  ionViewWillEnter(){
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val.id;
      this.DocumentAvalider( this.currentUser);
      this.Mesdocuments(this.currentUser);
      this.GetArchiveDocs(this.currentUser);

      });
  }
  projets
  public isSearchbarOpened=false;
  projtsSearch=[]
  getItems(event){
    let val =event.target.value;
    this.projtsSearch = [];
    this.projtsSearch=this.projets
    console.log("sdqf",this.projtsSearch);
    if(val && val.trim() != ''){
      this.projtsSearch = this.projtsSearch.filter((location) => {
        if(location.intitule != null)
        return location.intitule.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  
  }
  Documentvalider;
  DocumentAvalider(id){
    this.api.DocumentAvalider(id).then(d=>{
      let data=JSON.parse(d.data);
      this.Documentvalider=data.mesDocuments;
      console.log("this.Documentvalider",this.Documentvalider)
    })
  }
  MesDocuments;
  Mesdocuments(iduser){
    this.api.Mesdocuments(iduser).then(d=>{
      let data=JSON.parse(d.data);
      this.MesDocuments=data.mesDocuments;
      console.log("this.MesDocuments",this.MesDocuments)
    })
  }
  MesArchives;
  GetArchiveDocs(iduser){
    this.api.GetArchiveDocs(iduser).then(d=>{
      let data=JSON.parse(d.data);
      this.MesArchives=data.mesDocuments;
      console.log("this.MesDocuments",this.MesDocuments)
    })
  }

  async goesToAvalider(id){
    const alert =  await this.alert.create({
      message: 'document à remettre dans la liste "A Valider"',
      buttons: [
        {
          role: 'cancel',
          text: 'Annuler',
          cssClass: 'secondary',
          handler: () => {
              }
        },
        {
          text: 'Confirmer',
          cssClass: 'secondary',
          handler: ()=>{
            this.api.ReturnArchive(id).then(d=>{
              this.api.presentToast('Opération effectuée')
              this.DocumentAvalider( this.currentUser);
              this.GetArchiveDocs(this.currentUser);
            }) 
          }
        }
      ]
    
      
    }
    );
       await alert.present();
  }

  godetail(id){
    this.nav.navigateRoot(`/detail-docs/`+id);
    console.log("this.id",id)
  }
}
