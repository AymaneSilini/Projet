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

  constructor(private api:ApiService, private modalCtrl: ModalController) { 
  }

  ngOnInit() {
    this.api.getLigne().subscribe(data=>{
      this.dataLigne = data;
    })
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
