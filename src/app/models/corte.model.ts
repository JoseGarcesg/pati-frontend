export interface Corte {
  id?: number; // opcional si el backend lo genera
  mesa: string;
  fechaCorte: string;
  referencia: string;
  material: string;
  cantidadProgramada: number;
  detalles: CorteDetalle[];
}

export interface CorteDetalle {
  talla: string;
  color: string;
  cantidad: number;
}

