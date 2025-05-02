export interface IProdutoListaProduto {
  id: number;
  quantidade: number;
  unidade: string;
  valor: number | null;
  produtoId: number;
  produto: {
    id: number;
    nome: string;
    observacao?: string
  };
  listaProdutosId: number;
  statusProdutoListaId: number;
  compraId: number | null
}