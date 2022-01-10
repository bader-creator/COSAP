import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { AlertController, ToastController, NavController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthtificationtokenService } from 'src/app/services/authtificationtoken.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment/moment.js';
import 'moment-timezone';
@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.page.html',
  styleUrls: ['./detail-task.page.scss'],
})
export class DetailTaskPage implements OnInit {
  id = null;
  task;
  users;
  edit=false;

  env=environment.pathfile;

  ticketObject={
    "id":null,
    "titre":null,
    "idprioriter":null,
    "time":"18:00",
    "Echeance":new Date().toISOString(),
    "idUserEnCopie":null
 }
 


  constructor(public menuCtrl: MenuController,private authService:AuthtificationtokenService, private activatedRoute: ActivatedRoute,private api:RestapiService,private alertCtrl:AlertController,private storage: Storage,private toastController: ToastController,private nav: NavController) {this.menuCtrl.enable(true);
    this.api.usersEnCopie=[];
    this.edit=false;

    this.api.getPersonnels().then(d => {
      let    data= JSON.parse(d.data)
      this.users=data.personnels;
      console.log('users',this.users);

    });
   }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.ticketObject.id=this.id;

     this.api.getTicketById(this.id).then(d=>{
      let    data= JSON.parse(d.data)
      this.task= data[0];
      console.log("task",this.task);
      this.ticketObject.titre=this.task.intitule;
      this.ticketObject.Echeance=this.task.dateLimite;
     })

  }


  




  async terminerTicket(taskid) {
    const alert = await this.alertCtrl.create({
      message: 'Commentaire',
      inputs: [
        {
          name: 'comment',
          placeholder: 'comment'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            
            this.api.terminerTicket(taskid,data.comment,"Terminer");
          }
        }
      ]
    });
    await alert.present();
  }

  async MAJTicket(taskid) {
    const alert = await this.alertCtrl.create({
      message: 'Mise à jour',
      inputs: [
        {
          name: 'comment',
          placeholder: 'comment'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            
            this.api.terminerTicket(taskid,data.comment,"MAJ");
          }
        }
      ]
    });
    await alert.present();
  }



  
  async reaffecterTicket(taskid,charge) {
    let inputs=[]
    
    this.users.forEach(element => {
      inputs.push({
        type: "radio",
        label: element.nom+" "+element.prenom,
        value: element.id,
     
      })
      
    });
  


    const alert = await this.alertCtrl.create({
      message: 'Réaffecter Action',
      inputs,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Réaffecter',
          handler: iduserReaffecter  => {

            this.id_user=iduserReaffecter
            this.users.forEach(element => {
              if(iduserReaffecter  == element.id) {
                charge = element.charge;
              }
            });


            console.log("id.task",this.task.criticity.id);
            if(charge >= 80 && this.task.criticity.id != 22){
              this.force_charge(taskid);

            }else{
              this.api.reaffecterTicket(taskid,iduserReaffecter);

            }
           

            
              

          
          }
        }
      ]
    });

   

    await alert.present();
  }
  id_user
  async force_charge(taskid){
    const alert =  await this.alertCtrl.create({
      header :'Vous êtes d\'accord?' ,
      message: 'S\'il vous plaît dites si vous êtes d\'accord?',
      buttons: [
        {
          role: 'cancel',
          text: 'Annuler',
          handler: () => {
              }
        },
        {
          text: 'Réaffecter',
          handler: () =>{
           
              this.api.reaffecterTicket(taskid,this.id_user);
           
          }
        }
      ]
    
      
    }
    );
       await alert.present();
  
  }



  usersEnCopie;
  currentUser;
  ionViewWillEnter(){
  
    this.storage.get('currentUser').then((val) => { this.currentUser=val;});
    this.usersEnCopie=this.api.usersEnCopie;
  }


  i


  logout(){
    this.authService.logout();
  }
  


showedit(state){
  this.edit=state;
}


  editticket(){
    this.ticketObject.idUserEnCopie=this.api.usersEnCopie;
    this.ticketObject.Echeance= moment(new Date(this.ticketObject.Echeance).setHours(Number(this.ticketObject.time.split(":")[0]),Number(this.ticketObject.time.split(":")[1]), 0, 0)).toISOString();
    console.log(this.ticketObject);

    setTimeout(() => {
      this.presentToast("Action Modifiée");
      this.nav.navigateRoot('/task/Request');
    }, 2000);

    this.api.editerTicket(this.ticketObject);
   
    
  }
  onDateChanged() {

    if(new Date(this.ticketObject.Echeance).setHours(0, 0, 1, 0)>new Date().setHours(0, 0, 0, 0)){
    
    } else{
      this.ticketObject.Echeance=new Date().toISOString(),
     this.presentToast("Date Invalide");
    }
 

    }

    async presentToast(msg:string) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 3000
      });
      toast.present();
      }

}
