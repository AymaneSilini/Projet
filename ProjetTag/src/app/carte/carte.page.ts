import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {

  search:String;
  map: Leaflet.Map;
  darkmap: string;
  clearmap:string;
  colormap:string;
  private toogleval: boolean;
  dataArret = [];
  tramA = [];
  tramB = [];
  tramC = [];
  tramD = [];
  tramE = [];
  long:string;
  lat:string;
  constructor(private api:ApiService) { 
    this.darkmap = 'https://data.mobilites-m.fr/carte/{z}/{x}/{y}.png';
    this.clearmap = 'https://data.mobilites-m.fr/carte-dark/{z}/{x}/{y}.png'

  }

  ngOnInit() {
    this.api.getDetailLigne().subscribe(data=>{
      this.dataArret = data["features"];
    })

    this.api.getTramA().subscribe(data=>{
      //recherche directement le tableau de coordonnées
      this.tramA = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramB().subscribe(data=>{
      this.tramB = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramC().subscribe(data=>{
      this.tramC = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramD().subscribe(data=>{
      this.tramD = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramE().subscribe(data=>{
      this.tramE = data["features"][0]["geometry"]["coordinates"][0];
    })


  }

  research(){
    console.log(this.search);
  }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([ 45.195721,5.706785], 13);
    Leaflet.tileLayer(this.clearmap, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    var iconbus = Leaflet.icon({
      iconUrl: '/assets/bus.png',
      iconSize: [40, 40]
      }); 

        for (let k=0;k<this.dataArret.length;k++){
           //console.log(this.dataArret[k]["properties"]["LIBELLE"]);
           if (this.dataArret[k]["properties"]["COMMUNE"] == "GRENOBLE" || this.dataArret[k]["properties"]["COMMUNE"] == "ÉCHIROLLES" || this.dataArret[k]["properties"]["COMMUNE"] == "SAINT-MARTIN-D'HÈRES" || this.dataArret[k]["properties"]["COMMUNE"] == "SEYSSINS"
           || this.dataArret[k]["properties"]["COMMUNE"] == "SEYSSINET-PARISET" || this.dataArret[k]["properties"]["COMMUNE"] == "FONTAINE" || this.dataArret[k]["properties"]["COMMUNE"] == "SAINT-MARTIN-LE-VINOUX"
           || this.dataArret[k]["properties"]["COMMUNE"] == "SAINT-ÉGRÈVE" || this.dataArret[k]["properties"]["COMMUNE"] == "FONTANIL-CORNILLON"|| this.dataArret[k]["properties"]["COMMUNE"] == "LA TRONCHE"
           || this.dataArret[k]["properties"]["COMMUNE"] == "GIÈRES" || this.dataArret[k]["properties"]["COMMUNE"] == "LE PONT-DE-CLAIX"){
           Leaflet.marker([this.dataArret[k]["geometry"]["coordinates"][1], this.dataArret[k]["geometry"]["coordinates"][0]],{icon:iconbus}).addTo(this.map).bindPopup(this.dataArret[k]["properties"]["LIBELLE"]);
           }
      }

      //pour inverser la latitude et la longitude de A
      for (let k=0;k<this.tramA.length;k++){
        this.long = this.tramA[k][1] 
        this.lat = this.tramA[k][0]
        this.tramA[k][0] = this.long;
        this.tramA[k][1] = this.lat;
        }

      //pour inverser la latitude et la longitude de B
      for (let k=0;k<this.tramB.length;k++){
        this.long = this.tramB[k][1] 
        this.lat = this.tramB[k][0]
        this.tramB[k][0] = this.long;
        this.tramB[k][1] = this.lat;
        }
      
       //pour inverser la latitude et la longitude de C
       for (let k=0;k<this.tramC.length;k++){
        this.long = this.tramC[k][1] 
        this.lat = this.tramC[k][0]
        this.tramC[k][0] = this.long;
        this.tramC[k][1] = this.lat;
        }

        //pour inverser la latitude et la longitude de D
        for (let k=0;k<this.tramD.length;k++){
        this.long = this.tramD[k][1] 
        this.lat = this.tramD[k][0]
        this.tramD[k][0] = this.long;
        this.tramD[k][1] = this.lat;
        }

        //pour inverser la latitude et la longitude de E
        for (let k=0;k<this.tramE.length;k++){
        this.long = this.tramE[k][1] 
        this.lat = this.tramE[k][0]
        this.tramE[k][0] = this.long;
        this.tramE[k][1] = this.lat;
        }



    Leaflet.polyline([this.tramA],
      {color: 'rgb(51,118,184)', weight: 8})
      .addTo(this.map);

    Leaflet.polyline([this.tramB],
      {color: 'rgb(71,154,69)', weight: 8})
      .addTo(this.map);

    Leaflet.polyline([this.tramC],
      {color: 'rgb(194,0,120)', weight: 8})
      .addTo(this.map);

    Leaflet.polyline([this.tramD],
      {color: 'rgb(222,153,23)', weight: 8})
      .addTo(this.map);

    Leaflet.polyline([this.tramE],
      {color: 'rgb(83,55,134)', weight: 8})
      .addTo(this.map);
  }


  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }


  tooglechanged(){
    if (this.toogleval ==true){
      Leaflet.tileLayer(this.darkmap, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
  
    }
    else if(this.toogleval ==false){
      Leaflet.tileLayer(this.clearmap, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    
  }



}
    

  


}
