import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class Corte {
  private api = 'http://localhost:8080/api/cortes';

  cortes = signal<any[]>([]);

  constructor(private http: HttpClient) {}

  getCortes(): Observable<any> {
    return this.http.get(this.api);
  }

  fetchCortes() {
    // actualizar el signal con los datos del backend
    this.getCortes().subscribe(data => this.cortes.set(data));
  }

  crearCorte(corte: any): Observable<any> {
    return new Observable(observer => {
      this.http.post(this.api, corte).subscribe({
        next: (res) => {
          // actualizar el signal con el nuevo corte
          this.cortes.update(list => [...list, res]);
          observer.next(res);
          observer.complete();
        },
        error: err => observer.error(err)
      });
    });
  }
}
