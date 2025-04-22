import {axiosApi} from "~/services/axiosApi";
import type {IProdutoListaProduto} from "~/interfaces/compras/listaProdutos/produtoListaProduto";

export const buscarUmProdutoListaProdutos = async (id: number): Promise<IProdutoListaProduto> => {
  return axiosApi(`lista-produtos/produto-lista-produtos/${id}`, {method: 'GET'})
}