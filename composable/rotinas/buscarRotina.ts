import {axiosApi} from "~/services/axiosApi";
import type {IRotina} from "~/interfaces/rotinas/rotina.interface";

export const buscarRotina = async (id: number): Promise<IRotina> => {
  return await axiosApi(`rotina/${id}`, { method: 'get'})
}