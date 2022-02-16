import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItineraireDetailPage } from '../itineraire-detail/itineraire-detail.page';

@Component({
  selector: 'app-itineraire',
  templateUrl: './itineraire.page.html',
  styleUrls: ['./itineraire.page.scss'],
})
export class ItinerairePage implements OnInit {
  departe;
  arrive;
  date;

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async initModal(){
    const modal = await this.modalCtrl.create({
      component:ItineraireDetailPage,
      componentProps: { 
        departe: this.departe,
        arrive: this.arrive,
        date: this.date
      }
    });
    return await modal.present();
  }
  
}
