export interface IEditarProdutoLista {
  nome: string;
  quantidade?: number;
  unidade?: string;
  tipoProdutoId?: number;
  observacao?: string
  valor?: number
  produtoListaProdutoId: number
}