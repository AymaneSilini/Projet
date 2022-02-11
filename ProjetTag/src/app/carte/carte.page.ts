import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';


@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {

  search:String;
  map: Leaflet.Map;

  constructor() { }

  ngOnInit() {
  }

  research(){
    console.log(this.search);
  }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap() {
    this.map = Leaflet.map('mapId').setView([ 45.195721,5.706785], 13);
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    Leaflet.marker([45.194830, 5.705783]).addTo(this.map).bindPopup('A');
    Leaflet.marker([45.15501292247387, 5.728423435722278]).addTo(this.map).bindPopup('B');
    

    antPath([[45.194830, 5.705783], [45.15501292247387, 5.728423435722278]],
      { color: '#FF0000', weight: 5, opacity: 0.6 })
      .addTo(this.map);
  }


  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }


}
