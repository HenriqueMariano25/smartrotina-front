import axios from "axios";
import type {AxiosRequestConfig} from 'axios';
import {useCookie} from "#app";

export const axiosApi = async <T>(endpoint: string, options: AxiosRequestConfig): Promise<T> => {
    const config = useRuntimeConfig()
    const token = useCookie("authToken").value

    const api = axios.create({
        baseURL: config.public.apiBase,
        timeout: 30000,
        headers: {
            "Content-type": "application/json",
            ...(token && {Authorization: `Bearer ${token}`})
        }
    })

    try {
        const response = await api(endpoint, options)

        return response.data
    } catch (err: any) {
        console.log(err)
        throw new Error(err.response?.data?.message || "Erro desconhecido")
    }
}