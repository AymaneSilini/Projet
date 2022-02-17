import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArretDetailPageRoutingModule } from './arret-detail-routing.module';

import { ArretDetailPage } from './arret-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArretDetailPageRoutingModule
  ],
  declarations: [ArretDetailPage]
})
export class ArretDetailPageModule {}