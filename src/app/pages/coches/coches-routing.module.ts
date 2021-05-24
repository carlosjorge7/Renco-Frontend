import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CochesPage } from './coches.page';

const routes: Routes = [
  {
    path: '',
    component: CochesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CochesPageRoutingModule {}
