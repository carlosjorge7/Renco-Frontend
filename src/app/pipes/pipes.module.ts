import { NgModule } from '@angular/core';
import { FiltroClientesPipe } from './filtro-clientes.pipe';
import { FiltroCochesPipe } from './filtro-coches.pipe';
import { FiltroRegistrosPipe } from './filtro-registros.pipe';

@NgModule({
  declarations: [FiltroClientesPipe, FiltroCochesPipe, FiltroRegistrosPipe],
  exports: [FiltroClientesPipe, FiltroCochesPipe, FiltroRegistrosPipe]
})
export class PipesModule { }
