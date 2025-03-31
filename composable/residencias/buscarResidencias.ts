import {axiosApi} from "~/services/axiosApi";

export const buscarResidencias = async () => {
  try {
    return await axiosApi("/residencia", {method: "GET"})
  } catch (err) {
    console.log(err)
  }
}