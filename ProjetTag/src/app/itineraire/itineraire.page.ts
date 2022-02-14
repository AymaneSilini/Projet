import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-itineraire',
  templateUrl: './itineraire.page.html',
  styleUrls: ['./itineraire.page.scss'],
})
export class ItinerairePage implements OnInit {
  dataArret = [];

  constructor(private api:ApiService,) { 
  }

  ngOnInit() {
    this.api.getDetailLigne().subscribe(data=>{
      this.dataArret = data["features"];
      console.log(this.dataArret);
    })
  }
  
}
