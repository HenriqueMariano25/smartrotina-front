import type {ICadastrarMercado} from "~/interfaces/mercados/cadastrarMercado.interface";
import type {IMercado} from "~/interfaces/mercados/mercado.interface";
import {axiosApi} from "~/services/axiosApi";

export const editarMercado = async (id: number, data: ICadastrarMercado): Promise<IMercado> => {
  return await axiosApi(`/mercado/${id}`, {method: 'PUT', data})
}