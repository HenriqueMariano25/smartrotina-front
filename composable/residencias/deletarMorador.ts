import {axiosApi} from "~/services/axiosApi";

export const deletarMorador = async (moradorId:number) => {
  try{
    return await axiosApi(`residencia/morador/${moradorId}`, {method: "DELETE"})
  }catch(err){
    console.log(err)
  }
}