import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArretDetailPage } from './arret-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ArretDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArretDetailPageRoutingModule {}