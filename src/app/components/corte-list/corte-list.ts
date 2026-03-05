import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-corte-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corte-list.html',
  styleUrl: './corte-list.css',
})
export class CorteList {
  @Input() cortes:any[]=[];
}
