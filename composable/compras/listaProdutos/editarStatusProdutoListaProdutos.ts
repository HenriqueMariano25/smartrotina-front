import {axiosApi} from "~/services/axiosApi";

export const editarStatusProdutoListaProdutos = async (id: number, statusProdutoListaId: number) => {
  return axiosApi(`/lista-produtos/produto-lista-produtos/${id}/status`, {
    method: 'PUT',
    data: {statusProdutoListaId},
  });
}