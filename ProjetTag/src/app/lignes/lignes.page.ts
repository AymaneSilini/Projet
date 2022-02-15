import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';
import { HorairePage } from '../horaire/horaire.page';



@Component({
  selector: 'app-lignes',
  templateUrl: './lignes.page.html',
  styleUrls: ['./lignes.page.scss'],
})
export class LignesPage implements OnInit {
  dataLigne = [];
  ligneTram = [];
  ligneRelais = [];
  ligneChrono = [];
  ligneProximo = [];
  ligneFlexo = [];

  constructor(private api:ApiService, private modalCtrl: ModalController) { 
  }

  ngOnInit() {
    this.api.getLigne().subscribe(data=>{
      this.dataLigne = data;
    
      for (let k=0;k<this.dataLigne.length;k++){
        if (this.dataLigne[k]["type"]== "TRAM"){
          this.ligneTram.push(this.dataLigne[k]);
        }

        else if (this.dataLigne[k]["type"]== "NAVETTE"){
          this.ligneRelais.push(this.dataLigne[k]);
        }
        else if (this.dataLigne[k]["type"]== "PROXIMO"){
          this.ligneProximo.push(this.dataLigne[k]);
        }
        else if (this.dataLigne[k]["type"]== "FLEXO"){
          this.ligneFlexo.push(this.dataLigne[k]);
        }
        else if (this.dataLigne[k]["type"]== "CHRONO"){
          this.ligneChrono.push(this.dataLigne[k]);
        }
    
      }
    });
    }
  
  


  showDetail(){
    console.log("click");
  }

  async iniModal(){
    const modal = await this.modalCtrl.create({
      component:HorairePage,
    });
  

  
  return await modal.present();
}




}
