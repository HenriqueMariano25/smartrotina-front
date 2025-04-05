import {axiosApi} from "~/services/axiosApi";
import type {IMorador} from "~/interfaces/residencias/morador.interface";

export const buscarMoradoresPorResidencia = async (residenciaId: number): Promise<IMorador[] | []> => {
  try {
    return await axiosApi(`/residencia/${residenciaId}/moradores`, {method: "GET"})
  }catch (err) {
    console.log(err)
    return []
  }
}