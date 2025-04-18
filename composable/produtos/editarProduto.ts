import type {IEditarProduto} from "~/interfaces/produtos/editarProduto.interface";
import type {IProduto} from "~/interfaces/produtos/produto.interface";
import {axiosApi} from "~/services/axiosApi";

export const editarProduto = async (id: number, data: IEditarProduto): Promise<IProduto> => {
  return await axiosApi(`produto/${id}`, {method: 'PUT', data})
}