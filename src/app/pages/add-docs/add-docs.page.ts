import { Component, OnInit } from '@angular/core';
import { RestapiService } from './../../../app/services/restapi.service';
import { Downloader ,DownloadRequest,NotificationVisibility} from '@ionic-native/downloader/ngx';
import { environment } from '../../../environments/environment';
import { Base64 } from '@ionic-native/base64/ngx';

import { DatePicker } from '@ionic-native/date-picker/ngx';


import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-add-docs',
  templateUrl: './add-docs.page.html',
  styleUrls: ['./add-docs.page.scss'],
})
export class AddDocsPage implements OnInit {
  
  document={
    "uplode":null,
    "typeFile":null,
    "destinataire":null,
    "currentUser":null,
    "titre":"",
    "name":""
  }

  env=environment.pathfile;
  constructor(private api:RestapiService,private storage:Storage,private downloader: Downloader,private fileChooser:FileChooser,private base64:Base64,private filePath:FilePath) { 


  }
  
  ngOnInit() {
    this.getProprietaire()
    this.storage.get('currentUser').then((val) => {
      this.document.currentUser = val.id;
        console.log("currentUser",this.document.currentUser);
    
  
      });
  }
  proprietaires=[]
  getProprietaire(){
    this.api.getProprietaire().then(d=>{
      let data=JSON.parse(d.data);
      this.proprietaires=data.proprietaire;
      console.log("proprietaires", this.proprietaires);
    })
  }

  download(){
    var url='http://vps662142.ovh.net/grh/web/uploads/Documents/demande.docx';
    var request: DownloadRequest = {
      uri:url,
      title: 'demande.docx',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,

      destinationInExternalPublicDir: {
          dirType: 'Download',
          subPath: 'demande.docx'
      },
  };
  
    console.log("request",request)
    this.downloader.download(request)
    .then((location: string) =>alert('File downloaded at:'+location ))
    .catch((error: any) => console.error(error));
  }
  

  verifeChamp=false;
  ajouterDocs(){
    this.verifeChamp=true;
    if(this.document.destinataire  && this.document.titre ){
      this.verifeChamp=false;
      console.log("typeFile",this.document.typeFile)
    this.api.ajouterDocs(this.document);
    }
  }
  annuler(){
    this.document={
      "uplode":null,
      "typeFile":null,
      "destinataire":null,
      "currentUser":null,
      "titre":"",
      "name":""
    }
    
  }

  StorgaeFile(){
      this.fileChooser.open().then(uri => {
      
        console.log("uri",uri)
            // get file path
        this.filePath.resolveNativePath(uri).then(file => {
          console.log("file",file)
          this.document.typeFile=file.split(".")[1];
          console.log(" this.document.typeFile", this.document.typeFile)
          let filePath: string = file;

          console.log(" tfilePath",filePath)


          if (filePath) {
                    // convert your file in base64 format
            this.base64.encodeFile(filePath).then((base64File: string) => {
        
                      this.document.uplode=base64File;
                     
                      
                console.log('uplode',this.document.uplode);
                      
                   
            }, (err) => {
              console.log('err'+JSON.stringify(err));
           
            });
          }
        }).catch(err => console.log(err));
      
       
      
      }).catch(e => console.log('uri'+JSON.stringify(e)));
    
    
    
    
    
    
    }
}
