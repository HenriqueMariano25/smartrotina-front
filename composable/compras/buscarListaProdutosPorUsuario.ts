import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";
import {axiosApi} from "~/services/axiosApi";

export const buscarListaProdutosPorUsuarioLogado = async (): Promise<IListaProdutos[] | []> => {
  try {
    return await axiosApi('/lista-produtos/usuario', {method: 'GET'})
  } catch (err) {
    console.log(err)

    return []
  }
}