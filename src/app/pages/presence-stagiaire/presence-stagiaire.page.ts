import { Component, OnInit } from '@angular/core';
import { AuthtificationtokenService } from './../../services/authtificationtoken.service';
import * as moment from 'moment/moment.js';
import { AlertController, NavController, Platform, ToastController, ModalController, MenuController } from '@ionic/angular';
import { RestapiService } from './../../services/restapi.service';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import * as $ from "jquery";
declare var $: $;
import { InfoComponent } from './../info/info.component';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-presence-stagiaire',
  templateUrl: './presence-stagiaire.page.html',
  styleUrls: ['./presence-stagiaire.page.scss'],
})
export class PresenceStagiairePage implements OnInit {
  datearray = [];
  presence;
  env = environment.pathavatar;
  listInfoUser = [];
  listInfoUserTrier = [];
  schedule = [];
  scheduleByName = [];
  state = true;
  jourTeleTravail;
  currentUser;
  feed;

  statut = true;

  feedInterne;
  feedExterne;
  constructor(private authService: AuthtificationtokenService, private alert: AlertController,
    private modalController: ModalController, private helper: JwtHelperService, private fcm: FCM, private menuCtrl: MenuController, private storage: Storage, private toastController: ToastController, private api: RestapiService) {

    this.menuCtrl.enable(true);

    moment.locale("FR");


    for (let index = 0; index < 20; index++) {
      let dateformat = [moment().add(index, 'days').format('dd/DD'), moment().add(index, 'days')]
      this.datearray.push(dateformat)
    }

  }

  dataFromModal;
  async settings(event, i, dateindex) {
    const modal = await this.modalController.create({
      component: InfoComponent,
      componentProps: { iduser: event, index: i, date: dateindex, currentUserId: this.currentUser.id },
      backdropDismiss: false,
    });

    modal.present();
    this.dataFromModal = await modal.onWillDismiss();
  }

  logout() {
    this.authService.logout();
  }



  async detailpersonnelToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }


  intervalNewsInterne
  intervalNewsExterne
  listNews() {
    let i = 0;
    let j = 0;
    this.api.getNews().then(data => {
      let news = JSON.parse(data.data)
      this.feed = news.news;

      let newsInterne = [];
      let newsExterne = [];


      news.news.forEach(element => {
        if (element.type == "Interne") {
          newsInterne.push(element)
        } else {
          newsExterne.push(element)
        }

      });


      this.intervalNewsInterne = setInterval(() => {
        if (i >= newsInterne.length) {
          i = 0;
        } else {

          this.feedInterne = newsInterne[i];
          i++;
        }
      }, 5000);

      this.intervalNewsExterne = setInterval(() => {
        if (j >= newsExterne.length) {
          j = 0;
        } else {

          this.feedExterne = newsExterne[j];
          j++;
        }
      }, 5000);


    });


  }
  ionViewWillLeave() {
    this.api.dismissFn();
  }
  Stagiaires
  listpresence() {


    this.listInfoUser = [];
    this.listInfoUserTrier = [];
    this.storage.get('currentUser').then((val) => {
      this.currentUser = val;
      this.api.getInfoSolde(val.id).then(data => {


        let infotoken = JSON.parse(data.data);
        this.api.tokensuperuser = infotoken.tokenSuperieur;
        // console.log("index :",infotoken.tokenSuperieur);


      });


      this.fcm.getToken().then(data => {
        console.log("mytokenfirebase: ", data);
        this.api.setTokenFireBase(this.currentUser.id, data);

      });

    });


    for (let index = 0; index < 20; index++) {
      this.schedule.push(moment().add(index, 'days').format('L'));
    }
    for (let index = 0; index < 20; index++) {
      this.scheduleByName.push(moment().add(index, 'days').format('dd'));
    }


    this.api.loadingFn()
    this.api.getPresence().then(data => {
      let test = JSON.parse(data.data)
      this.Stagiaires = test.stagiaires;
      this.api.dismissFn()
      console.log("presencvcxvxce :", test);


      if (this.Stagiaires) {
        this.Stagiaires.forEach(personel => {
          switch (personel.jourTeleTravail) {
            case "1": { this.jourTeleTravail = "lu"; break; }
            case "2": { this.jourTeleTravail = "ma"; break; }
            case "3": { this.jourTeleTravail = "me"; break; }
            case "4": { this.jourTeleTravail = "je"; break; }
            case "5": { this.jourTeleTravail = "ve"; break; }
            case "6": { this.jourTeleTravail = "sa"; break; }
            case "7": { this.jourTeleTravail = "di"; break; }
            default: { this.jourTeleTravail = "null"; break; }
          }


          let infoUser = { "id": null, "email": null, charge: 0, "nom": null, "prenom": null, "poste": null, "path": null, "events": null, "conges": null, "sorties": null, "teletravail": null, "tickets": null, "phone": null, "numeroPosteInterne": null, "matricule": null };

          infoUser.nom = personel.nom;
          infoUser.prenom = personel.prenom;

          console.log('personel.nom', personel.nom)
          infoUser.poste = personel.user.job.name;
          infoUser.path = personel.user.path;
          infoUser.email = personel.email;
          infoUser.id = personel.user.id;
          infoUser.charge = personel.charge;
          infoUser.phone = personel.telephone;
          infoUser.numeroPosteInterne = personel.numeroPosteInterne;
          infoUser.matricule = personel.matricule;




          let arrayEvent = [];
          let arrayConge = [];
          let arrayTele = [];
          let arrayTeleTravail = [];
          console.log('dhhd', this.scheduleByName);

          this.scheduleByName.forEach(s => {

            let presenceTele = { "value": null };
            if (this.jourTeleTravail.includes(s)) {
              presenceTele.value = true;


            } else {
              presenceTele.value = false;
            }
            arrayTele.push(presenceTele);
          });





          //debut evenement
          let evenementsList = [];
          //console.log("personel: ",personel)



          for (var key in personel.evenements) {
            console.log("event: ", personel.evenements[key])
            if (personel.evenements[key].finParticipation)
              if (!Object.keys(personel.evenements[key].finParticipation).includes(String(this.currentUser.id)) || this.currentUser.id != personel.id) {
                let index = 0;
                this.state = true;
                let events = [];
                //calcule nbr jours event
                while (this.state) {
                  if (moment(personel.evenements[key].fin).format('L') == moment(personel.evenements[key].debut).add(index, 'days').format('L')) {
                    this.state = false;
                  }
                  events.push(moment(personel.evenements[key].debut).add(index, 'days').format('L'))
                  index++;
                }
                this.schedule.forEach(s => {
                  let presenceEvent = { "value": null, "nom": null, "description": null, "lieu": null, "type": null, "id": null, "idusers": null, "idusersExit": null, "salle": null, "email": null };
                  if (events.includes(s)) {
                    presenceEvent.value = true;
                    presenceEvent.nom = personel.evenements[key].nom;
                    presenceEvent.description = personel.evenements[key].description;
                    presenceEvent.lieu = personel.evenements[key].lieu;
                    presenceEvent.type = personel.evenements[key].type;
                    presenceEvent.id = personel.evenements[key].id;
                    presenceEvent.idusers = personel.evenements[key].personnels;
                    presenceEvent.idusersExit = personel.evenements[key].finParticipation;
                    presenceEvent.salle = personel.evenements[key].salle;
                    presenceEvent.email = personel.evenements[key].email;
                  } else {
                    presenceEvent.value = false;
                    presenceEvent.type = personel.evenements[key].type;
                  }
                  arrayEvent.push(presenceEvent);
                });
                evenementsList.push(arrayEvent);
                arrayEvent = [];

              }





          }
          //teletravail

          let demandeTeleTravail = [];
          personel.TeleTravail.forEach(teletravail => {
            console.log('teletravail', teletravail)
            let index = 0;
            this.statut = true;
            let travail = [];
            //calcule nbr jours conge 




            while (this.statut) {
              if (moment(teletravail.dateFin).format('L') == moment(teletravail.dateDebut).add(index, 'days').format('L')) {
                this.statut = false;
              }
              travail.push(moment(teletravail.dateDebut).add(index, 'days').format('L'))
              index++;
            }
            this.schedule.forEach(s => {
              let TeleTravail = { "value": null, "id": null, "nbJours": null, "debut": null, "fin": null, "reprise": null };
              if (travail.includes(s)) {
                TeleTravail.value = true;
                console.log('TeleTravail.value', TeleTravail.value)
                TeleTravail.id = teletravail.id;
                console.log('TeleTravail.id', TeleTravail.id)
                TeleTravail.nbJours = teletravail.nbjours;
                console.log('TeleTravail.nbJours', TeleTravail.nbJours)
                TeleTravail.debut = teletravail.dateDebut;
                console.log('TeleTravail.debut', TeleTravail.debut)

                TeleTravail.fin = teletravail.dateFin;
                console.log('TeleTravail.fin', TeleTravail.fin)

                TeleTravail.reprise = teletravail.dateReprise;
                console.log('datereprise', TeleTravail.reprise)

              } else {
                TeleTravail.value = false;
              }
              arrayTeleTravail.push(TeleTravail);
            });
            console.log('arrayTeleTravail', arrayTeleTravail)
            demandeTeleTravail.push(arrayTeleTravail);
            console.log('demandeTeleTravail', demandeTeleTravail)

            arrayTeleTravail = [];
          });
          //debut conge
          let demandeCongesList = [];
          personel.demandeConges.forEach(conge => {
            let index = 0;
            this.state = true;
            let conges = [];
            //calcule nbr jours conge 




            while (this.state) {


              if (moment(conge.dateFinConge).format('L') == moment(conge.dateDebutConge).add(index, 'days').format('L')) {
                this.state = false;
              }
              conges.push(moment(conge.dateDebutConge).add(index, 'days').format('L'))
              index++;
            }
            this.schedule.forEach(s => {
              let presenceConge = { "value": null, "id": null, "nbJours": null };
              if (conges.includes(s)) {
                presenceConge.value = true;
                presenceConge.id = conge.id;
                presenceConge.nbJours = conge.nbJours;

              } else {
                presenceConge.value = false;
              }
              arrayConge.push(presenceConge);
            });
            demandeCongesList.push(arrayConge);
            arrayConge = [];
          });
          //fin conge
          //console.log("demandeCongesList :",demandeCongesList)

          //debut sortie
          let demandeSortiesList = [];
          personel.demandeSorties.forEach(sortie => {
            let arraySortie = [];
            this.schedule.forEach(s => {
              let presenceSortie = { "value": null, "duree": null, "id": null, "datedebut": null, "datefin": null };
              if (moment(sortie.dateSortie).format('L').includes(s)) {
                presenceSortie.value = true;
                presenceSortie.id = sortie.id;
                presenceSortie.duree = sortie.duree;
                presenceSortie.datedebut = sortie.heureDebut;
                presenceSortie.datefin = sortie.heureFin;
              } else {
                presenceSortie.value = false;
              }
              arraySortie.push(presenceSortie);
            });
            demandeSortiesList.push(arraySortie);
          });

          let TicketsList = [];
          personel.tickets.forEach(ticket => {
            let arrayTicket = [];
            this.schedule.forEach(s => {
              let presenceTicket = { "value": null, "intitule": null, "id": null, "deadline": null };
              if (moment(ticket.dateLimite).format('L').includes(s)) {

                if (ticket.userDestination.id == this.currentUser.id || ticket.userCreator.id == this.currentUser.id) {
                  presenceTicket.value = true;
                  presenceTicket.id = ticket.id;
                  presenceTicket.deadline = ticket.dateLimite;
                  presenceTicket.intitule = ticket.intitule;
                } else {
                  presenceTicket.value = false;
                }


              } else {
                presenceTicket.value = false;
              }
              arrayTicket.push(presenceTicket);
            });
            TicketsList.push(arrayTicket);
          });

          infoUser.tickets = TicketsList;
          infoUser.events = evenementsList;
          infoUser.conges = demandeCongesList;
          infoUser.teletravail = arrayTele;
          infoUser.sorties = demandeSortiesList;




          let stateFirsDayConge = false;
          infoUser.conges.forEach(element => {
            for (let index = 0; index < element.length; index++) {
              if (element[index].value) {
                stateFirsDayConge = true;
              }
            }
          });

          let stateFirsDaySortie = false;
          infoUser.sorties.forEach(element => {

            for (let index = 0; index < element.length; index++) {
              if (element[index].value) {
                stateFirsDaySortie = true;
              }
            }


          });

          let stateFirsDayEvent = false;
          infoUser.events.forEach(element => {
            for (let index = 0; index < element.length; index++) {
              if (element[index].value) {
                stateFirsDayEvent = true;
              }
            }
          });



          if (stateFirsDayConge || stateFirsDaySortie || stateFirsDayEvent) {
            this.listInfoUserTrier.push(infoUser);
          } else {
            this.listInfoUser.push(infoUser);
          }





        });
      }

      this.listInfoUser.forEach(element => {
        this.listInfoUserTrier.push(element)
      });


    }).catch((error) => {
      this.api.dismissFn();
      this.presentToast("Erreur");
    });






  }

  ionViewWillEnter() {

  }

  ngOnInit() {
    //this.listNews();
    this.listpresence();

  }


  async showNews(news) {

    const alert = await this.alert.create({
      header: news.title,
      message: news.content + "<br><span>" + moment(news.published).format('L') + " </span>",
    });
    await alert.present();


  }

  info;
  showinfo(x) {
    this.info = x;
    this.detailpersonnelToast(this.info.nom + " " + this.info.prenom + "\n" + this.info.poste);
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



  deleteDimanche(str) {
    var splitted = str[0].split("/");
    return splitted[0]
  }

}


