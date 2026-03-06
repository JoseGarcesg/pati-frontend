import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Taller } from '../../models/taller';
import { TallerService } from '../../services/taller';

@Component({
  selector: 'app-talleres',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './talleres.html',
  styleUrl: './talleres.css',
})
export class Talleres {talleres = signal<Taller[]>([]);

  nuevoTaller = signal<Taller>({
    nombre: ''
  });

  constructor(private tallerService: TallerService) {}

  ngOnInit(): void {
    this.cargarTalleres();
  }

  cargarTalleres() {
    this.tallerService.listar().subscribe(data => {
      this.talleres.set(data);
    });
  }

  crearTaller() {

    const taller = this.nuevoTaller();

    if (!taller.nombre) {
      alert("El nombre del taller es obligatorio");
      return;
    }

    this.tallerService.crear(taller).subscribe(res => {

      this.talleres.update(list => [...list, res]);

      this.nuevoTaller.set({ nombre: '' });

    });
  }

  eliminarTaller(id: number) {

    if (!confirm("¿Eliminar taller?")) return;

    this.tallerService.eliminar(id).subscribe(() => {

      this.talleres.update(list =>
        list.filter(t => t.id !== id)
      );

    });

  }
}
