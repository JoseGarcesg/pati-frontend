export interface AsignacionTaller {
  id?: number;
  confeccionista: string;
  fechaEstimada: string;
  tallerId: number;
  corteId: number;
}

export interface AsignacionTallerDTO {
  id: number;
  confeccionista: string;
  fechaEstimada: string;
  taller: string;
  idCorte: number;
  referencia: string;
  cantidad: number;
}