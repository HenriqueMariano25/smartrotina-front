import type {ICadastrarListaProdutos} from "~/interfaces/compras/cadastrarListaProdutos.interface";
import {axiosApi} from "~/services/axiosApi";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";

export const cadastrarListaProdutos = async (data: ICadastrarListaProdutos): Promise<IListaProdutos> => {
  try {
    return await axiosApi('/lista-produtos', {method: 'POST', data})
  } catch (err) {
    console.log(err)
    throw new Error('Erro ao cadastrar lista de produtos');
  }
}