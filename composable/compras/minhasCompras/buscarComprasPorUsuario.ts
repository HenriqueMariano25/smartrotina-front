import {axiosApi} from "~/services/axiosApi";
import type {ICompra} from "~/interfaces/compras/compras/compra.interface";

export const buscarComprasPorUsuario = async (): Promise<ICompra[]> => {
  return await axiosApi('/compra/usuario', {method: 'GET'});
}