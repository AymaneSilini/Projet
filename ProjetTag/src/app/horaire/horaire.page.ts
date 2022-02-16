import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { element } from 'protractor';
import { ApiService } from '../service/api.service';
import { Arret } from '../service/arret';
import { ArretFiltrePipe } from '../service/arret-filtre.pipe';

@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {

  arret : Arret[] = [];
  urlBase:string;
  search: String = "";
  depart:string = "";
  arrivee:string = "";
  lenght:number;
  ligne = [];
  colorText:string;

  constructor(private modalCtrl: ModalController, private api:ApiService) {
    this.urlBase = this.api.urlInfo;
    this.lenght = 0;
   }

  ngOnInit() {
    this.api.urlInfo = this.api.urlInfo + this.api.ligne;
    this.api.getInfo().subscribe(data=>{
      this.arret= data[0]["arrets"];
      this.depart = data[0]["arrets"][0]["stopName"];
      this.arrivee = data[1]["arrets"][0]["stopName"];
    })

    this.api.getLigne().subscribe(data=>{
      this.ligne= data;
      var found = this.ligne.find(element => element["shortName"] == this.api.ligne);
      this.api.color = "#" + found["color"];
      if (this.api.ligne.includes('C')){
        this.colorText = "dark";
      }
      else {
        this.colorText = "light";
      }
    })
        

    
  }
  async close(){
    const closeModal: string = 'Modal closed';
    await this.modalCtrl.dismiss(closeModal);
    this.api.urlInfo = this.urlBase;
  }

}
