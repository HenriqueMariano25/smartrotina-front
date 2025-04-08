import {axiosApi} from "~/services/axiosApi";
import type {IProduto} from "~/interfaces/compras/produto.interface";

export const buscarProdutosPorListaProdutos = async (listaProdutosId: number): Promise<IProduto[] | []> => {
  return await axiosApi(`/lista-produtos/${listaProdutosId}/produtos`, {method: 'GET'})
}