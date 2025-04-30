import type {ICadastrarMercado} from "~/interfaces/mercados/cadastrarMercado.interface";
import {axiosApi} from "~/services/axiosApi";

export const cadastrarMercado = async (data: ICadastrarMercado) => {
  return await axiosApi('/mercado', {method: 'POST', data})
}