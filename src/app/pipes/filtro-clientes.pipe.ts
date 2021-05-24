import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../modelos/Cliente';

@Pipe({
  name: 'filtroClientes'
})
export class FiltroClientesPipe implements PipeTransform {

  transform(clientes: Cliente[], valor: string): Cliente[] {
    if(valor.length == 0){
      return clientes;
    }
    valor = valor.toLowerCase();

    // tipo foreach --> la funcion filter devuelve al array filtrado
    return clientes.filter((cliente) => {
      return cliente.nombre.toLowerCase().includes(valor)
              || cliente.dni.includes(valor) || cliente.edad.toString().includes(valor);
    });
  }

}
