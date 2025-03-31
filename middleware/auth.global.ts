import {useAutenticacaoStore} from "~/stores/auth";


export default defineNuxtRouteMiddleware((to) => {
    const rotasPublicas = ['/login', '/cadastrar']
    const autenticacao = useAutenticacaoStore()

    if(autenticacao.estaAutenticado && rotasPublicas.includes(to.path)){
        return navigateTo('/')
    }

    if(!autenticacao.estaAutenticado && !rotasPublicas.includes(to.path)){
        return navigateTo('/login')
    }
})