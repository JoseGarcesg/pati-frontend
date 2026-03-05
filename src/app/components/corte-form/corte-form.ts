import { Component, OnInit, signal, EventEmitter, Output} from '@angular/core';
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
    cantidadProgramada: 0,
    detalles: [{ talla: '', color: '', cantidad: 0 }] // detalle inicial
  });

  // Catálogos como signals
  referencias = signal<string[]>([]);
  materiales = signal<string[]>([]);
  tallas = signal<string[]>([]);
  colores = signal<string[]>([]);
  mesas = signal<string[]>([]);

  constructor(
    private corteService: CorteService,
    private catalogoService: CatalogoService
  ) {}

  ngOnInit(): void {
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
  }

  agregarDetalle() {
    this.corte.update(c => ({
      ...c,
      detalles: [...c.detalles, { talla: this.tallas()[0] || '', color: this.colores()[0] || '', cantidad: 0 }]
    }));
  }

  eliminarDetalle(index: number) {
    this.corte.update(c => ({
      ...c,
      detalles: c.detalles.filter((_, i) => i !== index)
    }));
  }

  guardar() {
    this.corteService.crearCorte(this.corte()).subscribe((nuevoCorte: Corte) => {
      alert('Corte creado correctamente!');
      // Emitimos el corte recién creado (ya tipado como Corte)
      this.corteCreado.emit(nuevoCorte);
      // Limpiamos el formulario
      this.corte.set({
        mesa: '',
        fechaCorte: '',
        referencia: '',
        material: '',
        cantidadProgramada: 0,
        detalles: [{ talla: this.tallas()[0] || '', color: this.colores()[0] || '', cantidad: 0 }]
      });
    });
  }

  // Helpers para el template
  get corteValue() { return this.corte(); }
}