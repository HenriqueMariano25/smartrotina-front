import type {ICadastrarMorador} from "~/interfaces/residencias/cadastrarMorador.interface";
import {axiosApi} from "~/services/axiosApi";

export const cadastrarMorador = async (dados: ICadastrarMorador, residenciaId: number) => {
  try {
    return await axiosApi(`/residencia/${residenciaId}/morador`, {method: "POST", data: dados})
  } catch (err) {
    throw (err as Error)?.message
  }
}