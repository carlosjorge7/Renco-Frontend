import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coche } from '../modelos/Coche';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CochesService {

  private API = 'http://localhost/backend/api/coches';

  constructor(public http: HttpClient) { }

  getAllCoches(): Observable<Coche[]>{
    return this.http.get<Coche[]>(`${this.API}/a_coche_list.php`);;
  }

  createCoche(coche: Coche){
    return this.http.post(`${this.API}/a_coche_add.php`, JSON.stringify(coche));
  }

  getCoche(idCoche: number | string){
    return this.http.get(`${this.API}/a_coche_list_one.php?idCoche=${idCoche}`);
  }

  deleteCoche(idCoche: number | string) {
    return this.http.get(`${this.API}/a_coche_delete.php?idCoche=${idCoche}`);
  }

  updateCoche(coche: Coche) {
    return this.http.post(`${this.API}/a_coche_update.php`, JSON.stringify(coche));
  }
}
