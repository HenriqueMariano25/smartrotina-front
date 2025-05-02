import type {ICadastrarCompra} from "~/interfaces/compras/compras/cadastrarCompra.interface";
import {axiosApi} from "~/services/axiosApi";

export const cadastrarCompra = async (data: ICadastrarCompra) => {
  return await axiosApi('/compra', {method: 'POST', data});
}