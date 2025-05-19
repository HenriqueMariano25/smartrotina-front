import type {IUsuario} from "~/interfaces/usuarios/usuario.interface";
import {axiosApi} from "~/services/axiosApi";

export const editarAdministradorUsuario = async (id: number, administrador: boolean): Promise<IUsuario> => {
    return await axiosApi(`/usuario/${id}/administrador`, {method: 'PUT', data: {administrador}})
}