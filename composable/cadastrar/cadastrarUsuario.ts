import type {ICadastrarUsuario} from "~/interfaces/cadastrar/cadastrarUsuario.interface";
import {axiosApi} from "~/services/axiosApi";

export const cadastrarUsuario = async (data: ICadastrarUsuario) => {
  try {
    return await axiosApi('/autenticacao/cadastrar', {method: 'POST', data})
  } catch (error) {
    throw new Error(error.message);
  }
}