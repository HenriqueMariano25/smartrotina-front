import {axiosApi} from "~/services/axiosApi";
import type {ITipoProduto} from "~/interfaces/compras/tipoProduto.interface";

export const buscarTipoProdutoPorUsuario = async (): Promise<ITipoProduto[] | []> => {
  return await axiosApi('/lista-produtos/tipo-produto/usuario', {method: 'GET'})
}