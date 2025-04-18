import {axiosApi} from "~/services/axiosApi";
import type {IProduto} from "~/interfaces/produtos/produto.interface";

export const buscarUmProduto = async (id: number): Promise<IProduto> => {
  return axiosApi(`lista-produtos/produto/${id}`, { method: 'GET' })
}