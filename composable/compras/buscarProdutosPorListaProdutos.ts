import {axiosApi} from "~/services/axiosApi";
import type {IProdutoListaProduto} from "~/interfaces/compras/listaProdutos/produtoListaProduto";

export const buscarProdutosPorListaProdutos = async (listaProdutosId: number): Promise<IProdutoListaProduto[] | []> => {
  return await axiosApi(`/lista-produtos/${listaProdutosId}/produtos`, {method: 'GET'})
}