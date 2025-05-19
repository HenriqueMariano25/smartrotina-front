import {defineStore} from "pinia";
import type {LoginDto} from "~/dto/login/loginDto";
import type {IUsuario} from "~/interfaces/usuarios/usuario.interface";
import {axiosApi} from "~/services/axiosApi";

interface LoginResponse {
    token: string;
    usuario: IUsuario
}

export const useAutenticacaoStore = defineStore('autenticacao', {
    state: () => ({
        usuario: null as IUsuario | null,
        token: null as string | null
    }),
    actions: {
        async login(data: LoginDto) {
            const response: LoginResponse = await axiosApi("/autenticacao/login", {method: "POST", data})
            if (response.token) {
                this.token = response.token
                this.usuario = response.usuario
                const cookieToken =  useCookie('token', { maxAge: 60 * 60 * 24 * 7 })
                cookieToken.value = response.token
            }
        },
        logout() {
            const token = useCookie("token")
            token.value = null
            this.usuario = null
            navigateTo('/login')
        },
    },
    getters: {
        estaAutenticado: (state) => {
            return !!state.usuario
        }
    }
})