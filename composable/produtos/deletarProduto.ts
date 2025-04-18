import {axiosApi} from "~/services/axiosApi";
import type {IProduto} from "~/interfaces/produtos/produto.interface";

export const deletarProduto = async (id: number): Promise<IProduto> => {
  return await axiosApi(`/produto/${id}`, {method: 'DELETE'})
}