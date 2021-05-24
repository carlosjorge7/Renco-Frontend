import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'coches',
    loadChildren: () => import('./pages/coches/coches.module').then( m => m.CochesPageModule)
  },
  {
    path: 'contratos',
    loadChildren: () => import('./pages/contratos/contratos.module').then( m => m.ContratosPageModule)
  },
  {
    path: 'balances',
    loadChildren: () => import('./pages/balances/balances.module').then( m => m.BalancesPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
