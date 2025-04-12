import type {IEditarRotina} from "~/interfaces/rotinas/editarRotina.interface";
import {axiosApi} from "~/services/axiosApi";

export const editarRotina = async (id: number, data: IEditarRotina) => {
  return await axiosApi(`rotina/${id}`, { method: 'PUT', data });
}