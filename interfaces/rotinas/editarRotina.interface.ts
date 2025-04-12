export interface IEditarRotina {
  nome?: string;
  dataInicio?: Date;
  dataTermino?: Date | null;
  horaInicio?: string;
  horaTermino?: string;
  repeticao?: string;
  intervalo?: number;
  periodo?: string[];
  responsavelId?: number | null;
  residenciaId?: number | null;
  observacao?: string;
}