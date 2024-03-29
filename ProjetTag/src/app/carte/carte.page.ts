import { Attribute, Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { ApiService } from '../service/api.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { ArretDetailPage } from '../arret-detail/arret-detail.page';
import { ModalController } from '@ionic/angular';

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
  latitudePosition = 45.19324830070729; //latitude
  longitudePosition= 5.719439625003748; //longitude
  long:string;
  lat:string;
  coords;

  trajetTramA = [];
  trajetTramB = [];
  trajetTramC = [];
  trajetTramD = [];
  trajetTramE = [];
  infoTramA = [];
  infoTramB = [];
  infoTramC = [];
  infoTramD = [];
  infoTramE = [];

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

  constructor(private api:ApiService,private geolocation: Geolocation, private modalCtrl: ModalController) { 
    this.darkmap = 'https://data.mobilites-m.fr/carte-dark/{z}/{x}/{y}.png';
    this.clearmap = 'https://data.mobilites-m.fr/carte/{z}/{x}/{y}.png'
  }

  async ngOnInit() {
    //recupere tous les arrets
    this.api.getDetailLigne().subscribe(data=>{
      this.dataArret = data["features"];
    })

    //recupere pour chaque ligne les points de parcours
    this.api.getTramA().subscribe(data=>{
      //recherche directement le tableau de coordonnées
      this.trajetTramA = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramB().subscribe(data=>{
      this.trajetTramB = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramC().subscribe(data=>{
      this.trajetTramC = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramD().subscribe(data=>{
      this.trajetTramD = data["features"][0]["geometry"]["coordinates"][0];
    })

    this.api.getTramE().subscribe(data=>{
      this.trajetTramE = data["features"][0]["geometry"]["coordinates"][0];
    })

    await this.getCurrentCoordinates();

  }

  async getCurrentCoordinates() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.latitudePosition = resp.coords.latitude;
      this.longitudePosition = resp.coords.longitude;
      //console.log("BBBBBB", this.latitudePosition, this.longitudePosition)

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     //console.log("AAAAa")
  }

  research(){
    console.log(this.search);
  }


  ionViewDidEnter() { 
    this.leafletMap();
    this.map.on("zoomend",this.createMarkers.bind(this));
    }

    leafletMap() {
      this.map = Leaflet.map('mapId').setView([ this.latitudePosition,this.longitudePosition],13);
      Leaflet.tileLayer(this.clearmap, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map); 
  
        Leaflet.marker([this.latitudePosition, this.longitudePosition],{icon:this.iconUser}).addTo(this.map).bindPopup("Votre position");
  
        //pour inverser la latitude et la longitude de A
        for (let k=0;k<this.trajetTramA.length;k++){
          this.long = this.trajetTramA[k][1] 
          this.lat = this.trajetTramA[k][0]
          this.trajetTramA[k][0] = this.long;
          this.trajetTramA[k][1] = this.lat;
          }
  
        //pour inverser la latitude et la longitude de B
        for (let k=0;k<this.trajetTramB.length;k++){
          this.long = this.trajetTramB[k][1] 
          this.lat = this.trajetTramB[k][0]
          this.trajetTramB[k][0] = this.long;
          this.trajetTramB[k][1] = this.lat;
          }
        
         //pour inverser la latitude et la longitude de C
         for (let k=0;k<this.trajetTramC.length;k++){
          this.long = this.trajetTramC[k][1] 
          this.lat = this.trajetTramC[k][0]
          this.trajetTramC[k][0] = this.long;
          this.trajetTramC[k][1] = this.lat;
          }
  
          //pour inverser la latitude et la longitude de D
          for (let k=0;k<this.trajetTramD.length;k++){
          this.long = this.trajetTramD[k][1] 
          this.lat = this.trajetTramD[k][0]
          this.trajetTramD[k][0] = this.long;
          this.trajetTramD[k][1] = this.lat;
          }
  
          //pour inverser la latitude et la longitude de E
          for (let k=0;k<this.trajetTramE.length;k++){
          this.long = this.trajetTramE[k][1] 
          this.lat = this.trajetTramE[k][0]
          this.trajetTramE[k][0] = this.long;
          this.trajetTramE[k][1] = this.lat;
          }
  
  
  
      Leaflet.polyline([this.trajetTramA],
        {color: 'rgb(51,118,184)', weight: 8})
        .addTo(this.map);
  
      Leaflet.polyline([this.trajetTramB],
        {color: 'rgb(71,154,69)', weight: 8})
        .addTo(this.map);
  
      Leaflet.polyline([this.trajetTramC],
        {color: 'rgb(194,0,120)', weight: 8})
        .addTo(this.map);
  
      Leaflet.polyline([this.trajetTramD],
        {color: 'rgb(222,153,23)', weight: 8})
        .addTo(this.map);
  
      Leaflet.polyline([this.trajetTramE],
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

  let _this = this;
  async function arretDetail(a){
    console.log(a.latlng.lng);
    const modal = await _this.modalCtrl.create({
      component:ArretDetailPage,
      componentProps: { 
        lat: a.latlng.lat,
        lng: a.latlng.lng
      }
    });
    
    return await modal.present();
    
  }
  
  if(this.map.getZoom()>15 && this.map.hasLayer(this.groupMarkers)==false){
    for (let k=0;k<this.dataArret.length;k++){
      if (this.dataArret[k]["properties"]["COMMUNE"] == "GRENOBLE" || this.dataArret[k]["properties"]["COMMUNE"] == "ÉCHIROLLES" || 
      this.dataArret[k]["properties"]["COMMUNE"] == "SAINT-MARTIN-D'HÈRES" || this.dataArret[k]["properties"]["COMMUNE"] == "SEYSSINS"
      || this.dataArret[k]["properties"]["COMMUNE"] == "SEYSSINET-PARISET" || this.dataArret[k]["properties"]["COMMUNE"] == "FONTAINE" 
      || this.dataArret[k]["properties"]["COMMUNE"] == "SAINT-MARTIN-LE-VINOUX"|| this.dataArret[k]["properties"]["COMMUNE"] == "SAINT-ÉGRÈVE" 
      || this.dataArret[k]["properties"]["COMMUNE"] == "FONTANIL-CORNILLON"|| this.dataArret[k]["properties"]["COMMUNE"] == "LA TRONCHE"
      || this.dataArret[k]["properties"]["COMMUNE"] == "GIÈRES" || this.dataArret[k]["properties"]["COMMUNE"] == "LE PONT-DE-CLAIX"){
        this.markers.push(
          Leaflet.marker([this.dataArret[k]["geometry"]["coordinates"][1], 
          this.dataArret[k]["geometry"]["coordinates"][0]],
          {icon:this.iconbus}).on('click',arretDetail).addTo(this.map));
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

}
