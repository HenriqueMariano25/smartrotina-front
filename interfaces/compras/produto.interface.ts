export interface IProduto{
  id: number;
  nome: string;
  quantidade: number;
  tipoUnidade: string;
  tipoProdutoId: number;
  listaProdutosId: number;
  observacao?: string;
}