import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsignacionTaller, AsignacionTallerDTO } from '../models/asignacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  private api = 'http://localhost:8080/api/asignaciones';

  constructor(private http: HttpClient) {}

  listar(): Observable<AsignacionTallerDTO[]> {
    return this.http.get<AsignacionTallerDTO[]>(this.api);
  }

  crear(asignacion: AsignacionTaller): Observable<AsignacionTallerDTO> {
    return this.http.post<AsignacionTallerDTO>(this.api, asignacion);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

}