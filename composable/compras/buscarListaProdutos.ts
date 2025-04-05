import {axiosApi} from "~/services/axiosApi";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";

export const buscarListaProdutos = async (id: number): Promise<IListaProdutos | null> => {
  return await axiosApi(`lista-produtos/${id}`, {method: 'GET'})
}