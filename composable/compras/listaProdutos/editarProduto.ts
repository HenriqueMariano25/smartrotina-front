import type {IEditarProduto} from "~/interfaces/compras/listaProdutos/editarProduto.interface";
import {axiosApi} from "~/services/axiosApi";

export const editarProduto = async (id: number, data: IEditarProduto) => {
  return await axiosApi(`/lista-produtos/produto/${id}`, { method: 'PUT', data })
}