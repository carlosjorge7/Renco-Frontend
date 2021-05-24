import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../modelos/Registro';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/Cliente';
import { Coche } from '../modelos/Coche';
import { Balance} from '../modelos/Balance';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  private API = 'http://localhost/backend/api/registros';

  constructor(public http: HttpClient) { }

  getAllRegistros(): Observable<Registro[]>{
    return this.http.get<Registro[]>(`${this.API}/a_registro_list.php`);
  }

  getListClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.API}/a_registro_list_clientes.php`);
  }

  getListCoches(): Observable<Coche[]>{
    return this.http.get<Coche[]>(`${this.API}/a_registro_list_coches.php`);
  }

  createRegistro(registro: Registro){
    return this.http.post(`${this.API}/a_registro_add.php`, JSON.stringify(registro));
  }

  getRegistro(idRegistro: number | string){
    return this.http.get(`${this.API}/a_registro_list_one.php?idRegistro=${idRegistro}`);
  }

  deleteRegistro(idRegistro: number | string) {
    return this.http.get(`${this.API}/a_registro_delete.php?idRegistro=${idRegistro}`);
  }

  updateRegistro(registro: Registro) {
    return this.http.post(`${this.API}/a_registro_update.php`, JSON.stringify(registro));
  }

  getBalancesPorMes(): Observable<Balance[]> {
    return this.http.get<Balance[]>(`${this.API}/a_balances_mes.php`);
  }

  getTotalPrecios() {
    return this.http.get(`${this.API}/a_registros_total.php`);
  }
}
