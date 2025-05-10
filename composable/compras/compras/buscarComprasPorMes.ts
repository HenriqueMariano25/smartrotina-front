import {axiosApi} from "~/services/axiosApi";

export const buscarComprasPorMes = async (mesAno: string): Promise<{ nome: string; valor: number }[]> => {
  return await axiosApi('compra/relatorio/porMes', {
      method: "GET", params: {mesAno}
    }
  )
}
