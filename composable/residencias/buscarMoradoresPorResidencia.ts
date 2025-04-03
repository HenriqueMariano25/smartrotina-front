import {axiosApi} from "~/services/axiosApi";

export const buscarMoradoresPorResidencia = async (residenciaId: number) => {
  try {
    return await axiosApi(`/residencia/${residenciaId}/moradores`, {method: "GET"})
  }catch (err) {
    console.log(err)
  }
}