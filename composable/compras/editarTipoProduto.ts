import type {ICadastrarTipoProduto} from "~/interfaces/compras/cadastrarTipoProduto";
import {axiosApi} from "~/services/axiosApi";
import type {ITipoProduto} from "~/interfaces/compras/tipoProduto.interface";

export const editarTipoProduto = async (id: number, data: ICadastrarTipoProduto): Promise<ITipoProduto> => {
  return await axiosApi(`/lista-produtos/tipo-produto/${id}`, {method: "PUT", data})
}