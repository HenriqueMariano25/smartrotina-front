import {axiosApi} from "~/services/axiosApi";
import type {IMorador} from "~/interfaces/residencias/morador.interface";

export const buscarResponsaveisPorResidencia = async (id: number): Promise<IMorador[] | []> => {
  return await axiosApi(`residencia/${id}/responsaveis`, {method: "GET"})
}