import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItinerairePageRoutingModule } from './itineraire-routing.module';

import { ItinerairePage } from './itineraire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItinerairePageRoutingModule
  ],
  declarations: [ItinerairePage]
})
export class ItinerairePageModule {}
