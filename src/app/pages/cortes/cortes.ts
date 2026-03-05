import { Component,OnInit,signal } from '@angular/core';
import { Corte as CorteService } from '../../services/corte'
import { CorteForm } from '../../components/corte-form/corte-form';
import { CorteList } from '../../components/corte-list/corte-list';
import { Corte } from '../../models/corte.model';

@Component({
  selector: 'app-cortes',
  imports: [CorteForm, CorteList],
  templateUrl: './cortes.html',
  styleUrl: './cortes.css',
})
export class Cortes implements OnInit{
  cortes = signal<Corte[]>([]); // signal

  constructor(private corteService:CorteService){}

  ngOnInit(): void {
    // Traemos los cortes iniciales del backend
    this.corteService.getCortes().subscribe(data => this.cortes.set(data));
  }

  onCorteCreado(nuevoCorte: Corte) {
    // Actualiza la lista automáticamente
    this.cortes.update(list => [...list, nuevoCorte]);
  }
}
