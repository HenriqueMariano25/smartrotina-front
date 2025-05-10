import {axiosApi} from "~/services/axiosApi";
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";

export const buscarResidencias = async (): Promise<IResidencia[]> => {
  return await axiosApi("/residencia", {method: "GET"})
}