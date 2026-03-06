import { Component, OnInit, signal, computed, EventEmitter, Output } from '@angular/core';
import { Corte as CorteService } from '../../services/corte';
import { Corte, CorteDetalle } from '../../models/corte.model';
import { Catalogo as CatalogoService } from '../../services/catalogo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-corte-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './corte-form.html',
  styleUrls: ['./corte-form.css'],
})
export class CorteForm implements OnInit {

  @Output() corteCreado = new EventEmitter<Corte>();

  // Signal para el corte actual
  corte = signal<Corte>({
    mesa: '',
    fechaCorte: '',
    referencia: '',
    material: '',
    cantidadProgramada: 0, // no editable, se calculará automáticamente
    detalles: [] // inicializamos en ngOnInit
  });

  // Computed: suma de todas las cantidades de los detalles
  cantidadTotal = computed(() =>
    this.corte().detalles.reduce((sum, d) => sum + Number(d.cantidad || 0), 0)
  );

  // Catálogos
  referencias = signal<string[]>([]);
  materiales = signal<string[]>([]);
  tallas = signal<string[]>([]);
  colores = signal<string[]>([]);
  mesas = signal<string[]>([]);

  constructor(
    private corteService: CorteService,
    private catalogoService: CatalogoService
  ) { }

  ngOnInit(): void {
    // Cargar catálogos
    this.catalogoService.getCatalogo('referencia')
      .subscribe(data => this.referencias.set(data));
    this.catalogoService.getCatalogo('material')
      .subscribe(data => this.materiales.set(data));
    this.catalogoService.getCatalogo('color')
      .subscribe(data => this.colores.set(data));
    this.catalogoService.getCatalogo('talla')
      .subscribe(data => this.tallas.set(data));
    this.catalogoService.getCatalogo('mesa')
      .subscribe(data => this.mesas.set(data));

    // Inicializar detalles con primer talla/color disponible
    this.corte.update(c => ({
      ...c,
      detalles: [{
        talla: this.tallas()[0] || '',
        color: this.colores()[0] || '',
        cantidad: 1
      }]
    }));
  }

  // Agregar un nuevo detalle
  agregarDetalle() {
    const detalles = this.corte().detalles;
    const tallas = this.tallas();
    const colores = this.colores();

    for (let talla of tallas) {
      for (let color of colores) {
        const existe = detalles.some(d => d.talla === talla && d.color === color);

        if (!existe) {
          this.corte.update(c => ({
            ...c,
            detalles: [
              ...c.detalles,
              { talla, color, cantidad: 1 }
            ]
          }));
          return;
        }
      }
    }
    alert("Ya se usaron todas las combinaciones de talla y color");
  }

  // Eliminar detalle por índice
  eliminarDetalle(index: number) {
    this.corte.update(c => ({
      ...c,
      detalles: c.detalles.filter((_, i) => i !== index)
    }));
  }

  // Cambiar cantidad de un detalle (validando >=1)
  cambiarCantidadDetalle(index: number, cantidad: number) {
    if (cantidad < 1) cantidad = 1;
    this.corte.update(c => {
      const detalles = [...c.detalles];
      detalles[index] = { ...detalles[index], cantidad };
      return { ...c, detalles };
    });
  }

  detalleDuplicado(talla: string, color: string, indexActual: number): boolean {
    const detalles = this.corte().detalles;

    return detalles.some((d, i) =>
      i !== indexActual &&
      d.talla === talla &&
      d.color === color
    );
  }

  validarDetalle(index: number) {

    const detalle = this.corte().detalles[index];

    if (this.detalleDuplicado(detalle.talla, detalle.color, index)) {
      alert('Ya existe un detalle con esa talla y color');

      const detalles = this.corte().detalles;
      const tallas = this.tallas();
      const colores = this.colores();

      let nuevaTalla = '';
      let nuevoColor = '';

      for (let talla of tallas) {
        for (let color of colores) {

          const existe = detalles.some((d, i) =>
            i !== index && d.talla === talla && d.color === color
          );

          if (!existe) {
            nuevaTalla = talla;
            nuevoColor = color;
            break;
          }
        }
        if (nuevaTalla) break;
      }

      this.corte.update(c => {
        const nuevos = [...c.detalles];

        nuevos[index] = {
          talla: nuevaTalla,
          color: nuevoColor,
          cantidad: 1
        };
        return { ...c, detalles: nuevos };
      });
    }
  }

  // Guardar corte
  guardar() {
    const c = this.corte();
    // Validación simple
    if (!c.mesa || !c.fechaCorte || !c.referencia || !c.material || c.detalles.length === 0) {
      alert('Por favor complete todos los campos y agregue al menos un detalle.');
      return;
    }

    // Actualizamos cantidadProgramada antes de enviar
    const corteSend = {
      ...c,
      cantidadProgramada: c.detalles.reduce((sum, d) => sum + Number(d.cantidad || 0), 0)
    };

    this.corteService.crearCorte(corteSend).subscribe((nuevoCorte: Corte) => {
      alert('Corte creado correctamente!');
      this.corteCreado.emit(nuevoCorte);
      // Reset del formulario
      this.corte.set({
        mesa: '',
        fechaCorte: '',
        referencia: '',
        material: '',
        cantidadProgramada: 0,
        detalles: [{
          talla: this.tallas()[0] || '',
          color: this.colores()[0] || '',
          cantidad: 1
        }]
      });
    });
  }

}