import {axiosApi} from "~/services/axiosApi";

export const editarValorProduto = async (id: number, valor: number) => {
  return await axiosApi(`/lista-produtos/produto/${id}/valor`, { method: 'PUT', data: { valor }})
}