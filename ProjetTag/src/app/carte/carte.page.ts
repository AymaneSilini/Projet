import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';
import { ApiService } from '../service/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {

  search:String;
  map: Leaflet.Map;
  groupMarkers:any;
  darkmap: string;
  clearmap:string;
  colormap:string;
  private toogleval: boolean;
  dataArret = [];
  markers=[];
  latitude; //latitude
  longitude; //longitude

  iconbus = Leaflet.icon({
    iconUrl: '/assets/bus.png',
    iconSize: [40, 40]
    });
  icontram = Leaflet.icon({
      iconUrl: '/assets/tram.png',
      iconSize: [40, 40]
      });
  iconUser = Leaflet.icon({
        iconUrl: '/assets/user.gif',
        iconSize: [40, 40]
        });

  constructor(private api:ApiService,private geolocation: Geolocation) { 
    this.darkmap = 'https://data.mobilites-m.fr/carte-dark/{z}/{x}/{y}.png';
    this.clearmap = 'https://data.mobilites-m.fr/carte/{z}/{x}/{y}.png'

  }

  ngOnInit() {
    this.getCurrentCoordinates();
    this.api.getDetailLigne().subscribe(data=>{
      this.dataArret = data["features"];
    })

  }
  

//---------------------------------------------------------------------------------------------

  research(){
    console.log(this.search);
  }


  ionViewDidEnter() { 
    this.leafletMap();
    this.map.on("zoomend",this.createMarkers.bind(this));
   }


  leafletMap() {
    this.map = Leaflet.map('mapId').setView([ 45.194830, 5.705783], 13);
    Leaflet.tileLayer(this.clearmap, {minZoom:12}).addTo(this.map);

    Leaflet.marker([45.194830, 5.705783],{icon:this.iconUser}).addTo(this.map);

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
      document.body.setAttribute('class','dark');
  
    }
    else if(this.toogleval ==false){
      Leaflet.tileLayer(this.clearmap, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      document.body.setAttribute('class','light');
  }

}
    
createMarkers(){
  //console.log(this.map.getZoom());
  if(this.map.getZoom()>15 && this.map.hasLayer(this.groupMarkers)==false){
    for (let k=0;k<this.dataArret.length;k++){

    if (this.dataArret[k]["properties"]["COMMUNE"] == "GRENOBLE"){
        this.markers.push(Leaflet.marker([this.dataArret[k]["geometry"]["coordinates"][1], this.dataArret[k]["geometry"]["coordinates"][0]],{icon:this.iconbus}).addTo(this.map).bindPopup(this.dataArret[k]["properties"]["LIBELLE"]));
      }
    }
    this.groupMarkers = Leaflet.layerGroup(this.markers).addTo(this.map);
  }
  if(this.map.getZoom()<=15){
    if(this.map.hasLayer(this.groupMarkers)){
      this.map.removeLayer(this.groupMarkers);
    }
  }
  
}

options = {
  timeout: 10000, 
  enableHighAccuracy: true, 
  maximumAge: 3600
};
// use geolocation to get user's device coordinates
async getCurrentCoordinates() {
  await this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;
   }).catch((error) => {
     console.log('Error getting location', error);
   });
}
  


}
