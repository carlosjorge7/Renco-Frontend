import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContratosPageRoutingModule } from './contratos-routing.module';
import { ContratosPage } from './contratos.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratosPageRoutingModule,
    PipesModule
  ],
  declarations: [ContratosPage]
})
export class ContratosPageModule {}
