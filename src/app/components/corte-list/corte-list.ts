import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Corte, CorteDetalle } from '../../models/corte.model';

@Component({
  selector: 'app-corte-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corte-list.html',
  styleUrls: ['./corte-list.css'],
})
export class CorteList {
  // Recibe signal de cortes desde el componente padre
  @Input() cortes: Corte[] = [];
}
