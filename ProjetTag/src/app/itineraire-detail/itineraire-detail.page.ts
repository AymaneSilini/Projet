import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import * as Leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-itineraire-detail',
  templateUrl: './itineraire-detail.page.html',
  styleUrls: ['./itineraire-detail.page.scss'],
})
export class ItineraireDetailPage implements OnInit {
  
  latitude; //latitude
  longitude; //longitude
  loaded=false;
  depart;
  arrive;
  date;
  
  iconUser = Leaflet.icon({
    iconUrl: '/assets/user.gif',
    iconSize: [40, 40]
    });
    map: Leaflet.Map;

  constructor(private api:ApiService,private geolocation: Geolocation,private modalCtrl: ModalController) { 
  }

  async ngOnInit() {
    await this.getCurrentCoordinates();
    console.log(`${this.depart}`);
    console.log(`${this.arrive}`);
    console.log(`${this.date}`);
        
  }

  ionViewDidEnter() { 
    this.leafletMap();
  }

  leafletMap() {
    this.map = Leaflet.map('mapIti').setView([ this.latitude, this.longitude], 15);
    this.map.on("load",this.loaded=true);
    Leaflet.tileLayer('https://data.mobilites-m.fr/carte/{z}/{x}/{y}.png', {minZoom:12}).addTo(this.map);

    Leaflet.marker([ this.latitude, this.longitude],{icon:this.iconUser}).addTo(this.map);
    
    
  }

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
  async getCurrentCoordinates() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  async close() {
    const closeModal: string = "Modal Closed";
    if(this.loaded==true){
      this.map.remove();
      this.loaded=false;
    }
    await this.modalCtrl.dismiss(closeModal);
  }

}
