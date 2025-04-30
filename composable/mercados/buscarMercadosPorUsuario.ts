import {axiosApi} from "~/services/axiosApi";
import type {IMercado} from "~/interfaces/mercados/mercado.interface";

export const buscarMercadosPorUsuario = async (): Promise<IMercado[]> => {
  return await axiosApi('/mercado/usuario', {method: 'GET'})
}