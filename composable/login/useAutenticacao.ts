import {axiosApi} from "~/services/axiosApi";
import type {LoginDto} from "~/dto/login/loginDto";
import type {IUsuario} from "~/interfaces/usuarios/usuario.interface";
import {type CookieRef, navigateTo} from "#app";

interface LoginResponse {
    token: string;
    usuario: IUsuario
}

export const useAutenticacao = async () => {
    const token = useCookie("token");

    const login = async (data: LoginDto) => {
        const usuario: CookieRef<IUsuario | null> = useCookie("usuario");
        const response: LoginResponse = await axiosApi("/autenticacao/login", {method: "POST", data})

        token.value = response.token
        usuario.value = response.usuario

        return { usuario: response.usuario };
    }

    const logout = () => {
        token.value = null
        navigateTo('/login')
    }

    return { login, token, logout }
}