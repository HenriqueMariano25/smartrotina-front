export interface ICadastrarCompra {
  formaPagamentoId: number,
  mercadoId: number,
  compradoEm: Date,
  valor: number,
  produtosListaProdutos: number[]
}