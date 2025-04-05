import {axiosApi} from "~/services/axiosApi";
import type {IResidencia} from "~/interfaces/residencias/residencia.interface";

export const buscarResidenciaPorUsuario = async (usuarioId: number): Promise<IResidencia[]> => {
  try {
    return await axiosApi(`/residencia/usuario/${usuarioId}`, {method: 'GET'})
  } catch (err) {
    console.log(err)
    return []
  }
}