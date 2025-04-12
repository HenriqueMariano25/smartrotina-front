import type {ICadastrarRotina} from "~/interfaces/rotinas/cadastrarRotina.interface";
import {axiosApi} from "~/services/axiosApi";

export const cadastrarRotina = async (data: ICadastrarRotina) => {
  return await axiosApi('/rotina', { method: 'POST', data });
}