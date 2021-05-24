import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../modelos/Cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private API = 'http://localhost/backend/api/clientes';

  constructor(public http: HttpClient) { }

  getAllClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.API}/a_cliente_list.php`);;
  }

  createCliente(cliente: Cliente){
    return this.http.post(`${this.API}/a_cliente_add.php`, JSON.stringify(cliente));
  }

  getCliente(idCliente: number | string){
    return this.http.get(`${this.API}/a_cliente_list_one.php?idCliente=${idCliente}`);
  }

  deleteCliente(idCliente: number | string){
    return this.http.get(`${this.API}/a_cliente_delete.php?idCliente=${idCliente}`);
  }

  updateCliente(cliente: Cliente) {
    return this.http.post(`${this.API}/a_cliente_update.php`, JSON.stringify(cliente));
  }
}
