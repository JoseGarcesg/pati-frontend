import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Catalogo {
  private api = 'http://localhost:8080/api/catalogos';

  constructor(private http: HttpClient) {}

  getCatalogo(tipo: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/${tipo}`);
  }

}
