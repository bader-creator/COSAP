import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestapiService } from '../../services/restapi.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tracabilite',
  templateUrl: './tracabilite.page.html',
  styleUrls: ['./tracabilite.page.scss'],
})
export class TracabilitePage implements OnInit {
  id
  ticketTracability;


  constructor(public menuCtrl: MenuController,private activatedRoute: ActivatedRoute,private api:RestapiService) {
    this.menuCtrl.enable(true); 
  }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.api.getTicketById(this.id).then(d=>{
      let    data= JSON.parse(d.data)
      console.log('datat',data);
      this.ticketTracability=data[0].ticketTracability;
      console.log('tickettracinbilty',this.ticketTracability);
     })
  }


}
