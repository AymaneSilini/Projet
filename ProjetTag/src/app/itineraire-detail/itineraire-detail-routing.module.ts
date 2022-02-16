import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItineraireDetailPage } from './itineraire-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ItineraireDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItineraireDetailPageRoutingModule {}