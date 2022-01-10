import { Injectable } from "@angular/core";
import * as moment from "moment/moment.js";
import { AuthtificationtokenService } from "./authtificationtoken.service";
import { environment } from "../../environments/environment";
import {
  NavController,
  ToastController,
  LoadingController,
  Platform,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { HTTP } from "@ionic-native/http/ngx";
import { Storage } from "@ionic/storage";
import { timeout } from "rxjs/operators";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/timeout";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { pipe } from "@angular/core/src/render3";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { InfoComponent } from "../pages/info/info.component";

@Injectable({
  providedIn: "root",
})
export class RestapiService {
  public tokensuperuser;
  userSelected;
  usersEnCopie = [];
  taskShortCut;
  congeDate;
  validation;
  task;
  idEvent;
  currentUser;
  notificationMessage;
  token;
  decode;
  roles;
  Stagiaire;
  Guest;
  constructor(
    private authService: AuthtificationtokenService,
    private helper: JwtHelperService,
    private alert: AlertController,
    private nav: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private http2: HTTP,
    private storage: Storage,
    private httpClient: HttpClient,
    public http3: Http,
    public platform: Platform,
    private modalController: ModalController
  ) {
    console.log("Hello RestApiProvider Provider");

    this.platform.backButton.subscribe(() => {
      this.nav.back();
      this.nav.navigateRoot(`/home`);
    });
  }

  async Toast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      keyboardClose: true,
      animated: true,
      duration: 2000,
      color: color,
    })
    toast.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  public getTypeConge() {
    return this.http2.get(
      `${environment.url}/listTypeConge`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public ajouterConge(demande) {
    /*
  this.http2.post(`${environment.url}/addDemandeConge`, demande, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authService.getToken()})
    .then(data => {}).catch(error => { console.log(error);});
*/
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "Bearer " + this.authService.getToken(),
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type",
      }),
    };
    let params = new URLSearchParams();

    for (let key in demande) {
      params.set(key, demande[key]);
    }

    return this.httpClient
      .post(
        `${environment.url}/addDemandeConge`,
        params.toString(),
        httpOptions
      )
      .pipe(timeout(600000));
  }

  public DemandeTeleTravail(event, id) {
    return this.http2.post(`${environment.url}/demandeTeletravail/${id}`, event, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authService.getToken()
    }).then((d) => {
      this.presentToast('Demande en cours de Validation.');
      if (this.authService.Stagiaire) {
        this.nav.navigateRoot(`/presence-stagiaire`);
      } else if (this.authService.Guest) {
        this.nav.navigateRoot(`/staff-presence`);
      }
      else if (this.authService.sfmCameroun) {
        this.nav.navigateRoot(`/sfm-cameroun-presence`);
      }
      else {
        this.nav.navigateRoot(`/index`);
      }
    })
      .catch((error) => {
        console.log(error);
      });
  }

  listDemandeTeleTravailEnCoursParSuperieur(id) {
    return this.http2.get(
      `${environment.url}/DemandeTeleTravailEnCoursParSuperieur/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  listNumberGrh(id) {
    return this.http2.get(
      `${environment.url}/GetNumberGrh/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  DetailTeleTravail(id) {
    return this.http2.get(
      `${environment.url}/DetailTeleTravail/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }


  Annulerdemande(id) {
    return this.http2.get(
      `${environment.url}/Annulerdemande/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    ).then(d => {
      this.presentToast('Demande refusée.');
      this.nav.navigateRoot(`/congeavalider`);
    })
  }

  Validerdemande(id) {
    return this.http2.get(
      `${environment.url}/Validerdemande/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    ).then(d => {
      this.presentToast('Demande validée.');
      this.nav.navigateRoot(`/congeavalider`);
    })
  }

  public ajouterEvent(event) {
    this.loadingFn();
    this.http2
      .post(`${environment.url}/addEvenement`, event, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((d) => {
        this.dismissFn();
        console.log("d,", d.data);
        let data = JSON.parse(d.data);
        this.idEvent = data.evenement_id;
        console.log("idEvent", this.idEvent);

        this.presentToast("Evénement ajouté avec succès");
        this.nav.navigateRoot(`/home`);
      })
      .catch((error) => {
        this.dismissFn()
        console.log(error);
      });
  }

  post_message(message, id_projet, id_personel, type) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "Bearer " + this.authService.getToken(),
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type",
      }),
    };

    let params = new URLSearchParams();

    for (let key in message) {
      params.set(key, message[key]);
    }

    return this.httpClient.post(
      `${environment.url}/addMessage/${id_projet}/${id_personel}/${type}`,
      params.toString(),
      httpOptions
    );
  }


  public modifiEvent(event, idevent) {
    this.loadingFn()
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "Bearer " + this.authService.getToken(),
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type",
      }),
    };

    let params = new URLSearchParams();

    for (let key in event) {
      params.set(key, event[key]);
    }

    return this.httpClient
      .post(
        `${environment.url}/ModifierEvenement/${idevent}`,
        params.toString(),
        httpOptions
      )
      .pipe(timeout(600000)).subscribe(data => {


        this.dismissFn()
        this.presentToast("Evenement modifié avec succes");
        if (this.authService.Stagiaire) {
          this.nav.navigateRoot(`/presence-stagiaire`);
        } else if (this.authService.Guest) {
          this.nav.navigateRoot(`/staff-presence`);
        }
        else if (this.authService.sfmCameroun) {
          this.nav.navigateRoot(`/sfm-cameroun-presence`);
        }
        else {
          this.nav.navigateRoot(`/index`);
        }



      }, err => {
        console.log(err);
        this.dismissFn()
      });
  }
  public getCharge() {
    console.log("service");
    return this.http2.get(
      `${environment.url}/GetChargeuser`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public teamEvent(event) {
    this.http2
      .post(`${environment.url}/groupeEvenement`, event, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then(() => {
        this.presentToast("Evenement créé avec succès");
        if (this.authService.Stagiaire) {
          this.nav.navigateRoot(`/presence-stagiaire`);
        } else if (this.authService.Guest) {
          this.nav.navigateRoot(`/staff-presence`);
        }
        else if (this.authService.sfmCameroun) {
          this.nav.navigateRoot(`/sfm-cameroun-presence`);
        }
        else {
          this.nav.navigateRoot(`/index`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public ajouterAutorisationSortie(demande) {
    demande.dateSortie = moment(demande.dateSortie).format("YYYY-MM-DD");
    this.http2.post(`${environment.url}/addDemandeSortie`, demande, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authService.getToken(),
    });
  }

  public getDemandeCongeById(id: number) {
    return this.http2.get(
      `${environment.url}/demandeConge/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public get_event(idevenement) {
    return this.http2.get(
      `${environment.url}/getEvent/${idevenement}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public get_message(id_projet, id_personel, type) {
    return this.http2.get(
      `${environment.url}/getMessage/${id_projet}/${id_personel}/${type}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getDemandeSortieById(id: number) {
    return this.http2.get(
      `${environment.url}/demandeSortie/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getDemandeSortieByIdPersonnel(id: number) {
    return this.http2.get(
      `${environment.url}/listDemandeSortie/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getDemandeCongeByIdPersonnel(id: number) {
    return this.http2.get(
      `${environment.url}/listDemandeConge/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getAllDemandeSortieValiderNoExpirer() {
    return this.http2.get(
      `${environment.url}/listDemandeSortieValideeNonExpiree`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getAllDemandeCongeValiderNoExpirer() {
    return this.http2.get(
      `${environment.url}/listDemandeCongeValideeNonExpiree`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public listDemandeCongeEnCoursByIdPersonnel(id: number) {
    return this.http2.get(
      `${environment.url}/listDemandeCongeEnCours/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public listDemandeCongeEnCoursParSuperieur(id: number) {
    return this.http2.get(
      `${environment.url}/listDemandeCongeEnCoursParSuperieur/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public listDemandeSortieEnCoursParSuperieur(id: number) {
    return this.http2.get(
      `${environment.url}/listDemandeSortieEnCoursParSuperieur/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public listDemandeSortieEnCoursByIdPersonnel(id: number) {
    return this.http2.get(
      `${environment.url}/listDemandeSortieEnCours/${id}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public ConfirmerDemande(msg, id, token, comment) {
    let postData = {
      etat: msg,
      id: id,
      token: token,
      title: "Demande de congé " + msg,
      message: "Demande de congé " + msg + "\n" + comment,
    };

    this.http2
      .post(`${environment.url}/validationDemandeConge`, postData, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        this.nav.navigateRoot(`/congeavalider`);
        this.presentToast("Demande " + msg);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }

  public ConfirmerDemandeSortie(msg, id, token) {
    let postData = {
      etat: msg,
      id: id,
      token: token,
      title: "Autorisation de sortie " + msg,
      message: "Autorisation de sortie " + msg,
    };
    console.log("postData : ", postData);
    this.http2
      .post(`${environment.url}/validationDemandeSortie`, postData, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        this.nav.navigateRoot(`/congeavalider`);
        this.presentToast("Demande " + msg);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error);
      });
  }

  public setTokenFireBase(id, token = null) {
    let postData = { idPersonnel: id, token: token };
    console.log("postData", postData);
    this.http2.post(`${environment.url}/setTokenFireBase`, postData, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authService.getToken(),
    });
  }

  public getInfoSolde(id) {
    return this.http2.get(
      `${environment.url}/getSoldeInfo/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getPresence() {
    return this.http2.get(
      `${environment.url}/presence`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getNews() {
    return this.http2.get(
      `${environment.url}/actualite`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public quitterEvent(event) {
    this.http2
      .post(
        `${environment.url}/quitterEvent`,
        event,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((d) => {
        this.presentToast("Opération effectuée");
      });
  }

  public ParticiperEvent(event) {
    this.http2
      .post(
        `${environment.url}/ParticiperEvent`,
        event,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((d) => {
        this.presentToast("Opération effectuée");
      });
  }

  public NoteEventColture(idEvent) {
    this.http2
      .post(
        `${environment.url}/NoteEvent/` + idEvent,
        {},
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((d) => {
        this.presentToast("Opération effectuée");
      });
  }
  public NoteEventNOnColture(idEvent) {
    this.http2
      .post(
        `${environment.url}/NoteEventNonColture/` + idEvent,
        {},
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((d) => {
        this.presentToast("Opération effectuée");
      });
  }
  public ListParticipant(idreunion, type) {
    return this.http2.get(
      `${environment.url}/ListParticipant/${idreunion}/${type}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public SuppressionDemandeConge(msg, id, token) {
    let postData = {
      etat: msg,
      id: id,
      token: token,
      title: "Conge annuler",
      message: "Conge annuler",
    };
    console.log("postData : ", postData);
    this.http2
      .post(`${environment.url}/suppressionDemandeConge`, postData, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        if (this.authService.Stagiaire) {
          this.nav.navigateRoot(`/presence-stagiaire`);
        } else if (this.authService.Guest) {
          this.nav.navigateRoot(`/staff-presence`);
        }
        else if (this.authService.sfmCameroun) {
          this.nav.navigateRoot(`/sfm-cameroun-presence`);
        }
        else {
          this.nav.navigateRoot(`/index`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public SuppressionDemandeSortie(msg, id, token) {
    let postData = {
      etat: msg,
      id: id,
      token: token,
      title: "Autorisation de sortie annuler",
      message: "Autorisation de sortie annuler",
    };
    console.log("postData : ", postData);
    this.http2
      .post(`${environment.url}/suppressionDemandeSortie`, postData, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        if (this.authService.Stagiaire) {
          this.nav.navigateRoot(`/presence-stagiaire`);
        } else if (this.authService.Guest) {
          this.nav.navigateRoot(`/staff-presence`);
        }
        else if (this.authService.sfmCameroun) {
          this.nav.navigateRoot(`/sfm-cameroun-presence`);
        }
        else {
          this.nav.navigateRoot(`/index`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public jourFerie() {
    return this.http2.get(
      `${environment.url}/jourFerie`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  taskesTodo = [];
  taskesBu = [];
  taskesRequest = [];
  personnels = [];

  public getTasksParId(id) {
    return this.http2.get(
      `${environment.url}/TasksParId/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  TasksGFromHistorique
  public getTasksGFromHistorique(id) {
    return this.http2.get(
      `${environment.url}/TasksGFromHistorique/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );

  }
  public getTasksSpontanee(id) {
    console.log("getTasksSpontanee");
    return this.http2.get(
      `${environment.url}/TasksSpontanee/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  /*public getTasksSpontaneeByUser(id) {
    return this.http2.get(
      `${environment.url}/TasksSpontaneeByUser/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }*/

  public ActionTeletravail(data, id) {
    return this.http2.post(`${environment.url}/ActionTeletravail/` + id, data, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authService.getToken(),
    });
  }
  public ValiderActionSpontanee(data, id) {
    return this.http2.post(`${environment.url}/ActionSpontanee/${id}`, data, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authService.getToken(),
    });
  }
  public DeleteActionSpontane(id) {
    return this.http2.post(
      `${environment.url}/DeleteActionSpontane/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public UpdateActionSpontanee(id, data) {
    return this.http2.post(
      `${environment.url}/UpdateActionSpontanee/` + id,
      data,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public PartagerAction(id, user) {
    this.http2
      .post(
        `${environment.url}/PartagerAction/${id}/${user}`,
        {},
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((data) => {
        console.log(data);
        this.presentToast("Opération effectuée");
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  public HistoriqueTeleTravailParAction(id) {
    return this.http2.get(
      `${environment.url}/HistoriqueTeleTravailParAction/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public DetailActionSpontanee(id) {
    return this.http2.get(
      `${environment.url}/DetailActionSpontanee/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }


  public getTasksParIdSuperieur(id) {
    return this.http2.get(
      `${environment.url}/TasksParIdSuperieur/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public getPersonnelBySupperieur(id) {
    return this.http2.get(
      `${environment.url}/PersonnelBySupperieur/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getTasks(id) {
    return this.http2.get(
      `${environment.url}/infoTasks/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getPersonnels() {
    return this.http2.get(
      `${environment.url}/personnels`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public getPersonnelsBySuperVision() {
    return this.http2.get(
      `${environment.url}/PersonnelsBySuperVision`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public ajouterTicket(ticket) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "Bearer " + this.authService.getToken(),
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type",
      }),
    };
    let params = new URLSearchParams();

    for (let key in ticket) {
      params.set(key, ticket[key]);
    }

    return this.httpClient
      .post(`${environment.url}/addTicket`, params.toString(), httpOptions)
      .pipe(timeout(600000));
  }

  ajouterEquipement(equipement) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "Bearer " + this.authService.getToken(),
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type",
      }),
    };

    let params = new URLSearchParams();

    for (let key in equipement) {
      params.set(key, equipement[key]);
    }

    return this.httpClient
      .post(`${environment.url}/addequipement`, params.toString(), httpOptions)
      .pipe(timeout(600000));
  }
  public getMesEquipements(idDestinataire) {
    return this.http2.get(
      `${environment.url}/MesEquipements/` + idDestinataire,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public getEquipements(idPropertaire) {
    return this.http2.get(
      `${environment.url}/Equipemennts/` + idPropertaire,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public DeleteEquipement(idEquipement) {
    return this.http2.get(
      `${environment.url}/DeleteEquipemennts/` + idEquipement,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public AffecterEquipement(data) {
    return this.http2.post(
      `${environment.url}/AffecterEquipemennts`, data,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public ConfirmerEquipement(idequipement, tracibilite) {
    return this.http2.post(
      `${environment.url}/ConfirmerEquipement/${idequipement}/${tracibilite}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public AnnulerEquipement(idtraciblite) {
    return this.http2.post(
      `${environment.url}/AnnulerEquipement/${idtraciblite}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public RenderEquipement(idtracibilite) {
    return this.http2.post(
      `${environment.url}/RenderEquipement/${idtracibilite}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public AnnulerRenderEquipement(idtracibilte) {
    return this.http2.post(
      `${environment.url}/AnnulerRenderEquipement/${idtracibilte}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public ConfirmerRenderEquipement(idequipement, idtracibilte) {
    return this.http2.post(
      `${environment.url}/ConfirmerRenderEquipement/${idequipement}/${idtracibilte}`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public PresenceRenion(Renion) {
    this.http2
      .post(`${environment.url}/PresenceRenion`, Renion, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        console.log(data);
        this.presentToast("Opération effectuée");
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  public AbsenceRenion(Renion) {
    this.http2
      .post(`${environment.url}/AbsenceRenion`, Renion, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        console.log(data);
        this.presentToast("Opération effectuée");
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  Userid
  async NotifAlert(renion, message) {
    const alert = await this.alert.create({
      header: "Réunion!",
      message: message,
      buttons: [
        {
          role: "Cancel",
          text: "Refuser",
          handler: () => {
            this.storage.get('currentUser').then((val) => {
              this.Userid = val.id
              console.log('Userid', this.Userid)
              let Renion = { renion: renion, iduser: this.Userid, type: "En réunion" };
              console.log('Renion', Renion)
              this.AbsenceRenion(Renion);
            });

          },
        },
        {
          text: "Confirmer",
          handler: () => {
            this.storage.get('currentUser').then((val) => {
              this.Userid = val.id
              console.log('Userid', this.Userid)
              let Renion = { renion: renion, iduser: this.Userid, type: "En réunion" };
              console.log('Renion', Renion)
              this.PresenceRenion(Renion);
            });
          },
        },
      ],
    });
    await alert.present();
  }
  async ShowAlertDemandeTeletravail(message) {
    const alert = await this.alert.create({
      header: 'Demande de télétravail',
      message: message,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.nav.navigateRoot(`/congeavalider`);
          }
        }
      ]

    })
    await alert.present();
  }

  ReunionInvite(iduser) {
    return this.http2.get(
      `${environment.url}/ReunionInvite/` + iduser,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  ListDeplacement(iduser) {
    return this.http2.get(
      `${environment.url}/ListDeplacement/` + iduser,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  async showAlertBilan() {
    const alert = await this.alert.create({
      header: 'Rappel',
      subHeader: 'Bilan Quotidien',
      message: 'N\'oubliez pas de remplir votre bilan',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.nav.navigateRoot(`/actions-grou-pe`);
          }
        }
      ]

    })
    await alert.present();
  }
  ListeProjetStagiaire(idStagiaire) {
    return this.http2.get(
      `${environment.url}/ListeProjetStagiaire/` + idStagiaire,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  ListProjetSelonEncadrant(idEncadrant) {
    return this.http2.get(
      `${environment.url}/ListProjetSelonEncadrant/` + idEncadrant,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public editerTicket(ticket) {
    this.http2
      .post(`${environment.url}/editTicket`, ticket, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  ChangeType(data) {
    this.http2
      .post(`${environment.url}/ChangeType`, data, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        this.presentToast("Opération effectuée avec succès")
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });

  }
  public ajouterDocs(docs) {
    this.http2
      .post(`${environment.url}/ajouterDocument`, docs, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        console.log(data);
        this.presentToast("Document ajouté avec succès");
        this.nav.navigateRoot(`/liste-documents`);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  public Mesdocuments(iduser) {
    return this.http2.get(
      `${environment.url}/Mesdocuments/` + iduser,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public DocumentAvalider(iDdestinataire) {
    return this.http2.get(
      `${environment.url}/documentAvalider/` + iDdestinataire,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public GetDetailDocs(idDocs) {
    return this.http2.get(
      `${environment.url}/detaildocs/` + idDocs,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public GetArchiveDocs(iDdestinataire) {
    return this.http2.get(
      `${environment.url}/ArchiveDocs/` + iDdestinataire,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public ReturnArchive(idDocs) {
    return this.http2.get(
      `${environment.url}/ReturnArchive/` + idDocs,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public ValiderDocs(docs) {
    this.http2
      .post(`${environment.url}/validerDocs`, docs, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        console.log(data);
        this.presentToast("Document validé et archivé");
        this.nav.navigateRoot(`/liste-documents`);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  public ArchiverAction(idticket) {
    return this.http2.get(
      `${environment.url}/ArchiverAction/` + idticket,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public DesarchiverAction(idticket) {
    return this.http2.get(
      `${environment.url}/DesarchiverAction/` + idticket,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public AnnulerTicketCopie(ticketcopie) {
    this.http2
      .post(`${environment.url}/AnnulerTicketCopie`, ticketcopie, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        this.presentToast("Opération effectuée");
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }

  public RefuserDocs(docs) {
    this.http2
      .post(`${environment.url}/refuserDocs`, docs, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        console.log(data);
        this.presentToast("Document refusé et archivé");
        this.nav.navigateRoot(`/liste-documents`);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }

  public EditerEquipement(equipement, idequipement) {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Authorization: "Bearer " + this.authService.getToken(),
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",

        "Access-Control-Allow-Origin": "*",

        "Access-Control-Allow-Headers": "Content-Type",
      }),
    };

    let params = new URLSearchParams();

    for (let key in equipement) {
      params.set(key, equipement[key]);
    }

    return this.httpClient.post(
      `${environment.url}/EditerEquipement/` + idequipement,
      params.toString(),
      httpOptions
    );
  }

  public validerTicket(id) {
    this.http2
      .post(
        `${environment.url}/validerTicket/${id}`,
        {},
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((data) => {
        console.log(data);
        this.presentToast("Action validée");
        this.nav.navigateRoot(`/task`);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  public GETRss() {
    const RSS_URL: any = "https://www.mosaiquefm.net/fr/rss";
    const KEY: any = "8jryumj0hopefwfuvpvuvimfsnonpyezzfx9qoom";
    const COUNT: any = 20;
    const API_URL: any = "https://api.rss2json.com/v1/api.json";
    return this.http2.post(
      API_URL,
      { rss_url: RSS_URL, api_key: KEY, count: COUNT },
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public terminerTicket(id, comment, state) {
    this.http2
      .post(
        `${environment.url}/terminerTicket/` + id,
        { msg: comment, state: state },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((data) => {
        console.log(data);

        if (state == "Annuler") {
          this.presentToast("Action annulée");
        }
        if (state == "Terminer") {
          this.presentToast("Action terminée");
        }
        if (state == "MAJ") {
          this.presentToast("Action MAJ");
        }

        this.nav.navigateRoot(`/task`);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }

  public reaffecterTicket(id, iduserReaffecter) {
    this.http2
      .post(
        `${environment.url}/reaffecterTicket/` + id,
        { iduserReaffecter: iduserReaffecter },
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.authService.getToken(),
        }
      )
      .then((data) => {
        console.log(data);
        this.presentToast("Action réaffectée");
        this.nav.navigateRoot(`/task/Request`);
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }

  public getTicketById(id) {
    return this.http2.get(
      `${environment.url}/TicketById/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  /*

getTasks(id):Observable<any>{
  let httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' +this.token})}
  return this.http.get(environment.url+`/infoTasks/`+id, httpOptions).pipe()
}
 
getPresence2():Observable<any>{
  let httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + this.authService.getToken()})}
  return this.http.get(environment.url+`/presence`, httpOptions).pipe();
 }
 



getPersonnels():Observable<any>{
  let httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token})}
  return this.http.get(environment.url+`/personnels`, httpOptions).pipe();
}

public ajouterTicket(ticket){
  this.http2.post(`${environment.url}/addTicket`, ticket, {'Content-Type': 'application/json','Authorization': 'Bearer ' + this.token})
    .then(data => {}).catch(error => { console.log(error);});
}
*/

  public getSalles() {
    return this.http2.get(
      `${environment.url}/listSalle`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  DeleteEvent(idEvent) {
    return this.http2.get(
      `${environment.url}/DeleteEvent/` + idEvent,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  DeleteParticipant(id, typeEvent) {
    return this.http2.get(
      `${environment.url}/DeleteParticipant/` + id + '/' + typeEvent,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public getCategorie() {
    return this.http2.get(
      `${environment.url}/categorie`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public getEtat() {
    return this.http2.get(
      `${environment.url}/etat`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  public getProprietaire() {
    return this.http2.get(
      `${environment.url}/proprietaire`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  getDetailEquipement(idEquipement) {
    return this.http2.get(
      `${environment.url}/detailEquipement/` + idEquipement,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  GetTaskAsigned(id) {
    return this.http2.get(
      `${environment.url}/TaskAsigned/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  GetTaskTOdo(id) {
    return this.http2.get(
      `${environment.url}/TaskTOdo/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  GetTaskEnCopie(id, date) {
    return this.http2.get(
      `${environment.url}/TaskEnCopie/` + id + `/` + date,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );

  }
  EnCopie
  TaskEnCopie
  date = new Date();
  GetEnCopie(idUser, date) {
    if (date == null) {
      console.log(' this.dateAPIs', this.date)
      this.date.setDate(this.date.getDate() - 5)
      console.log(' this.date', this.date)
    } else {
      this.date = new Date(date);
      this.TaskEnCopie = null;
      console.log('dateFromMODAL', date)
    }
    if (this.TaskEnCopie) {

    } else {

      this.loadingFn()
      this.GetTaskEnCopie(idUser, this.date).then(d => {
        let data = JSON.parse(d.data)
        this.TaskEnCopie = data.TicketEnCopie;
        this.EnCopie = data.TicketEnCopie;
        console.log('TaskEnCopie', this.TaskEnCopie);
        this.dismissFn();

      }).catch((error) => {
        this.dismissFn();
        console.log('error', error)
        this.presentToast("Erreur");
      });
    }

  }
  GetTaskByBU(id) {
    return this.http2.get(
      `${environment.url}/TaskByBU/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }
  GetTaskArchive(id) {
    return this.http2.get(
      `${environment.url}/TaskArchive/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public dashboard(id) {
    return this.http2.get(
      `${environment.url}/dashboard/` + id,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public get_projet() {
    return this.http2.get(
      `${environment.url}/listprojet`,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public VerificationDesponiblite(data) {
    return this.http2.post(
      `${environment.url}/VerificationDesponiblite`, data,
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public Porgramme_Journee(iduser) {
    return this.http2.get(
      `${environment.url}/PorgrammeJournee/` + iduser, {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  public addNews(news) {
    this.http2
      .post(`${environment.url}/addNews`, news, {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      })
      .then((data) => {
        console.log(data);
        this.presentToast("quote Ajoutée");
      })
      .catch((error) => {
        this.presentToast("Erreur");
        console.log(error.status);
      });
  }
  loading;
  async loadingFn() {
    this.loading = await this.loadingController.create({ message: "Chargement ..." });
    this.loading.present();
  }

  async dismissFn() {
    // console.log("dismiss");
    await this.loading.dismiss();
  }

  feedInterne;
  feedExterne;
  feed;
  newsInterne = [];
  listNews() {

    console.log('this.newsInternpi', this.newsInterne)
    this.storage.get('interne').then((val) => {
      console.log('storage interne val', val)
      if (val != null) {
        this.newsInterne = val;
        console.log('storage interne')
      }
      else {
        console.log('send api interne')

        this.getNews().then(data => {
          let news = JSON.parse(data.data)
          this.newsInterne = news.news
          this.newsInterne.forEach(element => {
            if (element.type == "Interne") {
              console.log('element', element)
              this.newsInterne.push(element)
            }
          });

          this.storage.set('interne', this.newsInterne);

        });

      }
    });





  }

  newsExterne = [];

  news() {
    this.storage.get('externe').then((val) => {
      console.log('storage externe val', val)
      if (val != null) {
        console.log('storage externe')
        this.newsExterne = val;
      }
      else {
        console.log('send api externe')
        this.GETRss().then(data => {
          let news = JSON.parse(data.data);

          this.newsExterne = news.items;


          this.newsExterne.forEach(element => {

            element.content = element.content.replace('src="', ' ');

          });

          this.storage.set('externe', this.newsExterne);
          var date = new Date();
          this.storage.set('dateNews', date);


        })

      }

    })





  }

  DeleteNews() {
    console.log('externe')
    console.log('interne')
    var date = new Date().toString()
    this.storage.get('dateNews').then((val) => {
      val = (new Date(val).getUTCFullYear() + "-" + (new Date(val).getMonth() + 1) + "-" + (new Date(val).getDate() + 1)).toString();
      date = (new Date(date).getUTCFullYear() + "-" + (new Date(date).getMonth() + 1) + "-" + (new Date(date).getDate() + 1)).toString();
      console.log('val Delete news', val)
      console.log('date Delete news', date)
      if (date > val) {
        console.log('date', date)
        this.storage.remove('externe');
        this.storage.remove('interne');
      }

    })


  }




  back() { }


}
