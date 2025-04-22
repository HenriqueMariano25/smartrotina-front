import type {
  IEditarProdutoLista
} from "~/interfaces/compras/listaProdutos/editarProdutoLista.interface";
import {axiosApi} from "~/services/axiosApi";

export const editarProdutoLista = async (id: number, produtoId: number, data: IEditarProdutoLista) => {
  return await axiosApi(`/lista-produtos/${id}/produto/${produtoId}`, {method: 'PUT', data})
}