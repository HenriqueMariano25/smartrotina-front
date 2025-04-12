export interface IRotina {
  id: number;
  nome: string;
  dataInicio: Date;
  dataTermino: Date | null;
  horaInicio: string | null;
  horaTermino: string | null;
  repeticao: string
  periodo: string[] | [];
  intervalo: number;
  residenciaId?: number | null;
  responsavelId?: number | null;
  observacao?: string | null;
}