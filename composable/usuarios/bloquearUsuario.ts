import type {IUsuario} from "~/interfaces/usuarios/usuario.interface";
import {axiosApi} from "~/services/axiosApi";

export const bloquearUsuario = async (id: number): Promise<IUsuario> => {
    return await axiosApi(`/usuario/${id}/bloquear`, { method: 'PUT' });
}