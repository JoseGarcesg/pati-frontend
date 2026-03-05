import { Component,OnInit } from '@angular/core';
import { Corte as CorteService } from '../../services/corte'
import { CorteForm } from '../../components/corte-form/corte-form';
import { CorteList } from '../../components/corte-list/corte-list';

@Component({
  selector: 'app-cortes',
  imports: [CorteForm, CorteList],
  templateUrl: './cortes.html',
  styleUrl: './cortes.css',
})
export class Cortes implements OnInit{
  cortes:any[] = [];

  constructor(private corteService:CorteService){}

  ngOnInit(): void {
    this.cargarCortes();
  }

  cargarCortes(){
    this.corteService.getCortes().subscribe(data=>{
      this.cortes = data;
    });
  }
}
