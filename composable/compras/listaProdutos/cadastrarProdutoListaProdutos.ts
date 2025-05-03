import type {ICadastrarProduto} from "~/interfaces/compras/cadastrarProduto.interface";
import {axiosApi} from "~/services/axiosApi";
import type {IProduto} from "~/interfaces/produtos/produto.interface";

export const cadastrarProdutoListaProdutos = async (listaProdutosId: number, data: ICadastrarProduto): Promise<IProduto> => {
  return await axiosApi(`/lista-produtos/${listaProdutosId}/produto`, {method: 'POST', data})
}