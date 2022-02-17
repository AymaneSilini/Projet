import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import {formatDate} from '@angular/common';

interface Arret {
  nomArret: string;
  horaires: Array<any>;
}

@Component({
  selector: 'app-arret-detail',
  templateUrl: './arret-detail.page.html',
  styleUrls: ['./arret-detail.page.scss'],
})
export class ArretDetailPage implements OnInit {

  nom;
  lat;
  lng;
  id;
  name = 'Angular';
  public d = new Date();//je déclare une variable pour la conversion
  public data = [];
  public convertArret = [];
  public convertArret2 = [];
  public noData: any;
  public results: Array<Arret> = []; //tableau qui peut contenir que des objets de type arret
  public results2:Array<Arret> = [];

  constructor(private api: ApiService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    var time = new Date().getTime() + 3600000;
    //console.log("Coords", `${this.lat}`,`${this.lng}`)
    await this.api.getDetailLigne().subscribe(data=>{
      for (let k=0;k<data["features"].length;k++){
      if (data["features"][k]["properties"]["COMMUNE"] == "GRENOBLE" || data["features"][k]["properties"]["COMMUNE"] == "ÉCHIROLLES" || 
      data["features"][k]["properties"]["COMMUNE"] == "SAINT-MARTIN-D'HÈRES" || data["features"][k]["properties"]["COMMUNE"] == "SEYSSINS"
      || data["features"][k]["properties"]["COMMUNE"] == "SEYSSINET-PARISET" || data["features"][k]["properties"]["COMMUNE"] == "FONTAINE" 
      || data["features"][k]["properties"]["COMMUNE"] == "SAINT-MARTIN-LE-VINOUX"|| data["features"][k]["properties"]["COMMUNE"] == "SAINT-ÉGRÈVE" 
      || data["features"][k]["properties"]["COMMUNE"] == "FONTANIL-CORNILLON"|| data["features"][k]["properties"]["COMMUNE"] == "LA TRONCHE"
      || data["features"][k]["properties"]["COMMUNE"] == "GIÈRES" || data["features"][k]["properties"]["COMMUNE"] == "LE PONT-DE-CLAIX"){
        if(data["features"][k]["geometry"]["coordinates"][1]==`${this.lat}` && data["features"][k]["geometry"]["coordinates"][0]==`${this.lng}`){
            this.nom=data["features"][k]["properties"]["LIBELLE"];
            this.id=data["features"][k]["properties"]["id"];
            //console.log(data["features"][k])
            break;
          }
    }
  }
  this.api.getArret(`${this.lng}`,`${this.lat}`).subscribe(data=>{
    //console.log(data[0])
    this.api.getHoraire(data[0],time).subscribe(results =>  {
      this.data = results;
      //console.log(this.data);
      var tmp:string;
      for (let i = 0; i <this.data[0].arrets.length;i++){
        //console.log(this.data[0]["arrets"][i]["stopName"]);
        tmp =this.data[0]["arrets"][i]["stopName"];

        if(tmp.toLowerCase().includes(this.nom.toLowerCase(), 0)){
        let newArret: Arret = {
          //cree un objet de type arret qui correspond  a linterace arret
          //objet arret pour init des valeur dedans
          nomArret: this.data[0]["arrets"][i]["stopName"],
          horaires: this.data[0]["arrets"][i]["trips"]
        };
        this.results.push(newArret);//ajoute des elements à la liste
        }
        
      }
      this.convert();
    });

    this.api.getHoraire(data[1],time).subscribe(results =>  {
      this.data = results;
      //console.log(this.data);
      var tmp:string;
      for (let i = 0; i <this.data[1].arrets.length;i++){
        //console.log(this.data[1]["arrets"][i]["stopName"]);
        tmp =this.data[1]["arrets"][i]["stopName"];

        if(tmp.toLowerCase().includes(this.nom.toLowerCase(), 0)){
        let newArret: Arret = {
          //cree un objet de type arret qui correspond  a linterace arret
          //objet arret pour init des valeur dedans
          nomArret: this.data[1]["arrets"][i]["stopName"],
          horaires: this.data[1]["arrets"][i]["trips"]
        };
        this.results2.push(newArret);//ajoute des elements à la liste
        }
        
      }
      this.convert();
    });
  })
    })
    
  
    
}

convert(){
  let convert = '';
  this.d.setHours(0,0,0,0);//date du jour initialisé à minuit
  this.d.getTime();
  for(let j = 0; j < this.results.length ;j++){
    ////console.log(this.results[j].horaires); //renvoie 4 horaires
    convert = '';
    for (let i = 0; i < this.results[j].horaires.length;i++){
      ////console.log(this.results[j].horaires[i]);
      let passage = new Date(this.d.getTime() + this.results[j].horaires[i] * 1000);
      this.convertArret.push(formatDate(passage,'HH:mm','en'));
    }
    console.log(this.convertArret);
  }

  for(let j = 0; j < this.results2.length ;j++){
    ////console.log(this.results2[j].horaires); //renvoie 4 horaires
    convert = '';
    for (let i = 0; i < this.results2[j].horaires.length;i++){
      ////console.log(this.results2[j].horaires[i]);
      let passage = new Date(this.d.getTime() + this.results2[j].horaires[i] * 1000);
      this.convertArret2.push(formatDate(passage,'HH:mm','en'));
    }
    console.log(this.convertArret2);
  }
}

close(){
  this.modalCtrl.dismiss();
}

}