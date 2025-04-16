export interface ICadastrarProduto {
  nome: string;
  quantidade: number;
  unidade: string;
  tipoProdutoId: number;
  observacao?: string
  valor?: number
}