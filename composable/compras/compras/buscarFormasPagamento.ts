import {axiosApi} from "~/services/axiosApi";
import type {IFormaPagamento} from "~/interfaces/compras/compras/formaPagamento.interface";

export const buscarFormasPagamento = async (): Promise<IFormaPagamento[]> => {
  return axiosApi('/compra/formas-pagamento', {method: 'GET'});
}