import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  {
    path: 'horaire',
    loadChildren: () => import('./horaire/horaire.module').then( m => m.HorairePageModule)
  },
  {
    path: 'itineraire-detail',
    loadChildren: () => import('./itineraire-detail/itineraire-detail.module').then( m => m.ItineraireDetailPageModule)
  },
  {
    path: 'arret-detail',
    loadChildren: () => import('./arret-detail/arret-detail.module').then( m => m.ArretDetailPageModule)
  },


  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
