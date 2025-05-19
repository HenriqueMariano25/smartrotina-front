import {axiosApi} from "~/services/axiosApi";
import type {IUsuario} from "~/interfaces/usuarios/usuario.interface";

export const buscarTodosUsuarios = async () : Promise<IUsuario[]> => {
    return axiosApi('/usuario/buscarTodos', { method: "GET"})
}