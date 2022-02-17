import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Arret } from '../service/arret';

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
  sens1 = [];
  sens0 = [];
  dateActuelle:number;
  min:string;
  heures:string;
  tableauHoraire = [];
  sens:boolean;

  urlPlan = "https://www.tag.fr/ftp/fiche_horaires/fiche_horaires_2014/PLAN_";

  constructor(private modalCtrl: ModalController, private api:ApiService) {
    this.urlBase = this.api.urlInfo;
    this.lenght = 0;
    this.dateActuelle = new Date().getTime() + 3600000;
    // var dateFinale =  dateActuelle - dateSec;
    // dateFinale = dateFinale /1000;
    console.log(this.dateActuelle);
    this.sens = false;
   }

  ngOnInit() {
    this.api.urlInfo = this.api.urlInfo + this.api.ligne + "&time=" + this.dateActuelle.toString();
    this.api.getInfo().subscribe(data=>{
      this.arret = data[0]["arrets"];
      this.sens0 = data[0]["arrets"];
      this.sens1 = data[1]["arrets"];
      this.depart = data[0]["arrets"][0]["stopName"];
      this.arrivee = data[1]["arrets"][0]["stopName"];     
    })

    this.api.getLigne().subscribe(data=>{
      this.ligne= data;
      var found = this.ligne.find(element => element["shortName"] == this.api.ligne);
      this.api.color = "#" + found["color"];
      if (this.api.ligne.includes('C') && this.api.ligne.length>1){
        this.colorText = "black";
      }
      else {
        this.colorText = "white";
      }
    })
    this.urlPlan = this.urlPlan + this.api.ligne + ".pdf";
    
  }

  
  async close(){
    const closeModal: string = 'Modal closed';
    await this.modalCtrl.dismiss(closeModal);
    this.api.urlInfo = this.urlBase;
  }

  getHoraire(event){
    let x = event.srcElement.id;
    this.tableauHoraire = x.split(",");
    for (let k=0;k<(this.tableauHoraire).length;k++){
      var horaire = this.transformHoraire(this.tableauHoraire[k])
      document.getElementById("horaire"+x).innerHTML += horaire;
   }
  }

  transformHoraire(x){
    var d = Number(x);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      if (m<10){
        this.min = "0" + m.toString();
      }
      else{
        this.min = m.toString();
      }
      return this.heures = h.toString() + ":" +this.min + " ";
  }

  changeSens(){
    if (this.sens == false){
      this.arret = this.sens1;
    }
    else if (this.sens ==true){
      this.arret = this.sens0;
    }
    this.sens  = !this.sens;

    var change = this.depart;
    this.depart = this.arrivee; 
    this.arrivee = change;
  }

  suivant(){
    // + 10 min
    this.dateActuelle = this.dateActuelle + 600000;
    console.log(this.dateActuelle)
    //relance affichage de date
  }

  precedent(){
    this.dateActuelle = this.dateActuelle - 600000;
        console.log(this.dateActuelle)

    //relance affichage de date

  }


  

}
