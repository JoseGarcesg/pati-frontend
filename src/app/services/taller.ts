import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taller } from '../models/taller';

@Injectable({
  providedIn: 'root',
})
export class TallerService {
  private api = 'http://localhost:8080/api/talleres';

  constructor(private http: HttpClient) {}

  listar(): Observable<Taller[]> {
    return this.http.get<Taller[]>(this.api);
  }

  crear(taller: Taller): Observable<Taller> {
    return this.http.post<Taller>(this.api, taller);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
