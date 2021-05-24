import { Pipe, PipeTransform } from '@angular/core';
import { Coche } from '../modelos/Coche';

@Pipe({
  name: 'filtroCoches'
})
export class FiltroCochesPipe implements PipeTransform {

  transform(coches: Coche[], valor: string): Coche[] {
    if(valor.length == 0){
      return coches;
    }
    valor = valor.toLowerCase();

    // tipo foreach --> la funcion filter devuelve al array filtrado
    return coches.filter((coche) => {
      return coche.marca.toLowerCase().includes(valor)
              || coche.matricula.includes(valor) || coche.color.includes(valor) || coche.km.toString().includes(valor);
    });
  }

}
