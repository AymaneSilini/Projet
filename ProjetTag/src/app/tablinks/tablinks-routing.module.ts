// tablinks-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: 'tablinks',
    component: TablinksPage,
    children: [
      {
        path: 'carte',
        loadChildren: () => import('../carte/carte.module').then(m => m.CartePageModule)
      },
      {
        path: 'favoris',
        loadChildren: () => import('../favoris/favoris.module').then(m => m.FavorisPageModule)
      },
      {
        path: 'itineraire',
        loadChildren: () => import('../itineraire/itineraire.module').then(m => m.ItinerairePageModule)
      },
      {
        path: 'lignes',
        loadChildren: () => import('../lignes/lignes.module').then(m => m.LignesPageModule)
      },


      {
        path: '',
        redirectTo: '/tablinks/carte',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tablinks/carte',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule { }
