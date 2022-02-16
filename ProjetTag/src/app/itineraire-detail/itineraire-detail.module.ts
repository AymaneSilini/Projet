import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItineraireDetailPageRoutingModule } from './itineraire-detail-routing.module';

import { ItineraireDetailPage } from './itineraire-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItineraireDetailPageRoutingModule
  ],
  declarations: [ItineraireDetailPage]
})
export class ItineraireDetailPageModule {}