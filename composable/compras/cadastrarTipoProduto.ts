import {axiosApi} from "~/services/axiosApi";
import type {ICadastrarTipoProduto} from "~/interfaces/compras/cadastrarTipoProduto";
import type {ITipoProduto} from "~/interfaces/compras/tipoProduto.interface";

export const cadastrarTipoProduto = async (data: ICadastrarTipoProduto): Promise<ITipoProduto> => {
  return await axiosApi('/lista-produtos/tipo-produto', {method: "POST", data})
}