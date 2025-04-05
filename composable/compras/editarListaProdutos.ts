import type {IEditarListaProdutos} from "~/interfaces/compras/editarListaProdutos.interface";
import {axiosApi} from "~/services/axiosApi";
import type {IListaProdutos} from "~/interfaces/compras/listaProdutos.interface";

export const editarListaProdutos = async (id: number, data: IEditarListaProdutos): Promise<IListaProdutos> => {
  return await axiosApi(`lista-produtos/${id}`, {method: 'PUT', data})
}