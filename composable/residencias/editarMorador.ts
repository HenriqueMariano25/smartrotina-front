import type {IEditarMorador} from "~/interfaces/residencias/editarMorador.interface";
import {axiosApi} from "~/services/axiosApi";

export const editarMorador = async (moradorId: number, data: IEditarMorador) => {
  try {
    return await axiosApi(`/residencia/morador/${moradorId}`, {method: "PUT", data})
  } catch (err) {
    console.log(err)
  }
}