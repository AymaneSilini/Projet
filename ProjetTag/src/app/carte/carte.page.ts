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
  constructor(private api:ApiService) { 
    this.darkmap = 'https://data.mobilites-m.fr/carte/{z}/{x}/{y}.png';
    this.clearmap = 'https://data.mobilites-m.fr/carte-dark/{z}/{x}/{y}.png'

  }

  ngOnInit() {
    this.api.getDetailLigne().subscribe(data=>{
      this.dataArret = data["features"];
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
      var icontram = Leaflet.icon({
        iconUrl: '/assets/tram.png',
        iconSize: [40, 40]
        });
    
    
        for (let k=0;k<=this.dataArret.length;k++){
           //console.log(this.dataArret[k]["properties"]["LIBELLE"]);
           Leaflet.marker([this.dataArret[k]["geometry"]["coordinates"][1], this.dataArret[k]["geometry"]["coordinates"][0]],{icon:icontram}).addTo(this.map).bindPopup(this.dataArret[k]["properties"]["LIBELLE"]);
      }
    console.log(this.dataArret[2]["geometry"]["coordinates"][0]);
    Leaflet.marker([this.dataArret[0]["geometry"]["coordinates"][1], this.dataArret[0]["geometry"]["coordinates"][0]],{icon:icontram}).addTo(this.map).bindPopup(this.dataArret[2]["properties"]["LIBELLE"]);

    Leaflet.marker([45.194830, 5.705783],{icon:icontram}).addTo(this.map).bindPopup('A');
    Leaflet.marker([45.15501292247387, 5.728423435722278],{icon:iconbus}).addTo(this.map).bindPopup('B');
    

    Leaflet.polyline([[45.194830, 5.705783], [45.15501292247387, 5.728423435722278]],
      {color: '#FF0000', weight: 5, opacity: 0.6 })
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
