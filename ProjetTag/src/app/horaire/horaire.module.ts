import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HorairePageRoutingModule } from './horaire-routing.module';

import { HorairePage } from './horaire.page';
import { ArretFiltrePipe } from '../service/arret-filtre.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HorairePageRoutingModule
  ],
  declarations: [HorairePage, ArretFiltrePipe],
  exports: [ArretFiltrePipe]
})
export class HorairePageModule {}
