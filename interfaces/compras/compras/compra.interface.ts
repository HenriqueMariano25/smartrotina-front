export interface ICompra {
  id: number;
  observacao: string;
  formaPagamentoId: number;
  mercadoId: number;
  usuarioId: number;
  compradoEm: Date;
  valor: number;
}