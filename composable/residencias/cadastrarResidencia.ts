import type {ICadastrarResidencia} from "~/interfaces/residencias/cadastrarResidencia.interface";
import {axiosApi} from "~/services/axiosApi";


export const cadastrarResidencia = async (dados: ICadastrarResidencia) => {

  try {
    return await axiosApi("/residencia", {method: "POST", data: dados})
  } catch (err) {
    throw (err as Error)?.message
  }
}