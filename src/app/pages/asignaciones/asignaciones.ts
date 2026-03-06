import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AsignacionService } from '../../services/asignacion';
import { TallerService } from '../../services/taller';
import { Corte as CorteService } from '../../services/corte';

import { AsignacionTallerDTO } from '../../models/asignacion';

@Component({
  selector: 'app-asignaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './asignaciones.html',
  styleUrl: './asignaciones.css',
})
export class Asignaciones implements OnInit {

  asignaciones = signal<AsignacionTallerDTO[]>([]);

  talleres: any[] = [];
  cortes: any[] = [];

  nuevaAsignacion = {
    confeccionista: '',
    fechaEstimada: '',
    tallerId: 0,
    corteId: 0
  };

  constructor(
    private asignacionService: AsignacionService,
    private tallerService: TallerService,
    private corteService: CorteService
  ) {}

  ngOnInit() {
    this.cargarAsignaciones();
    this.cargarTalleres();
    this.cargarCortes();
  }

  cargarAsignaciones() {
    this.asignacionService.listar().subscribe({
      next: (data) => {
        this.asignaciones.set(data);
      },
      error: (err) => {
        console.error("Error cargando asignaciones", err);
      }
    });
  }

  cargarTalleres() {
    this.tallerService.listar().subscribe({
      next: (data) => {
        this.talleres = data;
      },
      error: (err) => {
        console.error("Error cargando talleres", err);
      }
    });
  }

  cargarCortes() {
    this.corteService.getCortesDisponibles().subscribe({
      next: (data) => {
        this.cortes = data;
      },
      error: (err) => {
        console.error("Error cargando cortes", err);
      }
    });
  }

  crearAsignacion() {

    if (
      !this.nuevaAsignacion.confeccionista?.trim() ||
      !this.nuevaAsignacion.fechaEstimada ||
      !this.nuevaAsignacion.tallerId ||
      !this.nuevaAsignacion.corteId
    ) {
      alert("Debe completar todos los campos antes de crear la asignación");
      return;
    }

    this.asignacionService.crear(this.nuevaAsignacion).subscribe({

      next: () => {

        alert("Asignación creada correctamente");

        // reset formulario
        this.nuevaAsignacion = {
          confeccionista: '',
          fechaEstimada: '',
          tallerId: 0,
          corteId: 0
        };

        // 🔥 recargar datos desde backend
        this.cargarAsignaciones();
        this.cargarCortes();

      },

      error: (err) => {

        console.error(err);

        const mensaje =
          err?.error?.message ||
          err?.error?.error ||
          "Ocurrió un error al crear la asignación";

        alert(mensaje);

      }

    });

  }

  eliminar(id: number) {

    if (!confirm("¿Seguro que deseas eliminar esta asignación?")) {
      return;
    }

    this.asignacionService.eliminar(id).subscribe({

      next: () => {

        // 🔥 recargar datos desde backend
        this.cargarAsignaciones();
        this.cargarCortes();

      },

      error: (err) => {
        console.error("Error eliminando asignación", err);
        alert("Error eliminando la asignación");
      }

    });

  }

}