import {axiosApi} from "~/services/axiosApi";
import type {ITipoProduto} from "~/interfaces/compras/tipoProduto.interface";

export const deletarTipoProduto = async (id: number): Promise<ITipoProduto> => {
  return await axiosApi(`lista-produtos/tipo-produto/${id}`, {method: 'DELETE'})
}