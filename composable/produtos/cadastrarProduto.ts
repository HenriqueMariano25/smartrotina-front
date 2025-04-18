import {axiosApi} from "~/services/axiosApi";
import type {ICadastrarProduto} from "~/interfaces/produtos/cadastrarProduto.interface";

export const cadastrarProduto = async (data: ICadastrarProduto) => {
  return await axiosApi('/produto', {method: 'POST', data})
}