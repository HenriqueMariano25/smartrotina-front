import {axiosApi} from "~/services/axiosApi";
import type {IProduto} from "~/interfaces/produtos/produto.interface";

export const buscarProdutosPorUsuario = async (): Promise<IProduto[] | []> => {
  return await axiosApi('/produto', {method: "GET"})
}