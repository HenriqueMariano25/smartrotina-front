import {axiosApi} from "~/services/axiosApi";
import type {IRotina} from "~/interfaces/rotinas/rotina.interface";

export const buscarRotinasPorUsuario = async (): Promise<IRotina[] | []> => {
  return await axiosApi('rotina/usuario', { method: 'get'})
}