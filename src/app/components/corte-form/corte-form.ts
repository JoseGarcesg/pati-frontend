import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Corte, Corte as CorteService } from '../../services/corte'
import { Catalogo as CatalogoService } from '../../services/catalogo'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-corte-form',
  standalone: true,
  imports: [FormsModule
    , CommonModule
  ],
  templateUrl: './corte-form.html',
  styleUrl: './corte-form.css',
})
export class CorteForm implements OnInit {
  @Output() corteCreado = new EventEmitter();

  corte: any = {
    mesa: '',
    fechaCorte: '',
    referencia: '',
    material: '',
    cantidadProgramada: 0,
    detalles: []
  };

  referencias: string[] = [];
  materiales: string[] = [];
  tallas: string[] = [];
  colores: string[] = [];
  mesas: string[] = [];

  constructor(
    private corteService: CorteService,
    private catalogoService: CatalogoService
  ) { }

  ngOnInit(): void {

    console.log("entra a oninit de corte-form");
    
    this.catalogoService.getCatalogo('referencia')
      .subscribe(data => this.referencias = data);

    this.catalogoService.getCatalogo('material')
      .subscribe(data => this.materiales = data);

    this.catalogoService.getCatalogo('color')
      .subscribe(data => this.colores = data);

    this.catalogoService.getCatalogo('talla')
      .subscribe(data => this.tallas = data);

    this.catalogoService.getCatalogo('mesa')
      .subscribe(data => this.mesas = data);
  }

  agregarDetalle() {

    this.corte.detalles.push({
      talla: '',
      color: '',
      cantidad: 0
    });

  }

  eliminarDetalle(index: number) {

    this.corte.detalles.splice(index, 1);

  }

  guardar() {

    this.corteService.crearCorte(this.corte).subscribe(() => {

      alert("Corte creado");

      this.corte = {
        mesa: '',
        fechaCorte: '',
        referencia: '',
        material: '',
        cantidadProgramada: 0,
        detalles: []
      };

      this.corteCreado.emit();

    });

  }


}
