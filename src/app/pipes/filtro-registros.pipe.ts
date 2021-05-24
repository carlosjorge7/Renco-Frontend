import { Pipe, PipeTransform } from '@angular/core';
import { Registro } from '../modelos/Registro';

@Pipe({
  name: 'filtroRegistros'
})
export class FiltroRegistrosPipe implements PipeTransform {

  transform(registros: Registro[], valor: string): Registro[] {
    if(valor.length == 0){
      return registros;
    }
    valor = valor.toLowerCase();

    // tipo foreach --> la funcion filter devuelve al array filtrado
    return registros.filter((registro) => {
      return registro.fechaInicio.toString().includes(valor) || registro.nombre.toString().toLowerCase().includes(valor) || registro.marca.toString().toLowerCase().includes(valor)
              || registro.fechaFin.toString().includes(valor) || registro.precio.toString().includes(valor) || registro.descuento.toString().includes(valor)
              || registro.compra.includes(valor);
    });
  }

}
