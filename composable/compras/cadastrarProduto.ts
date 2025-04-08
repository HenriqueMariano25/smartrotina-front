import type {ICadastrarProduto} from "~/interfaces/compras/cadastrarProduto.interface";
import {axiosApi} from "~/services/axiosApi";
import type {IProduto} from "~/interfaces/compras/produto.interface";

export const cadastrarProduto = async (listaProdutosId: number, data: ICadastrarProduto): Promise<IProduto> => {
  return await axiosApi(`/lista-produtos/${listaProdutosId}/produto`, {method: 'POST', data})
}