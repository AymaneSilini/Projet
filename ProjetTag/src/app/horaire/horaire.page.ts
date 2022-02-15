import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
@Component({
  selector: 'app-horaire',
  templateUrl: './horaire.page.html',
  styleUrls: ['./horaire.page.scss'],
})
export class HorairePage implements OnInit {

  arretTram = [];
  urlBase:string;
 

  constructor(private modalCtrl: ModalController, private api:ApiService) {
    this.urlBase = this.api.urlInfo;
   }

  ngOnInit() {
    this.api.urlInfo = this.api.urlInfo + this.api.ligne;
    this.api.getInfo().subscribe(data=>{
      this.arretTram = data[0]["arrets"];
    })

    
  }
  async close(){
    const closeModal: string = 'Modal closed';
    await this.modalCtrl.dismiss(closeModal);
    this.api.urlInfo = this.urlBase;
  }

}
