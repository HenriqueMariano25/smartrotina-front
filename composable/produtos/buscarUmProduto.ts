import {axiosApi} from "~/services/axiosApi";

export const buscarUmProduto = async (id: number) => {
  return await axiosApi(`produto/${id}`, {method: 'GET'})
}