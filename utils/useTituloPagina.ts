export const useDadosPagina = () => useState<{ titulo: string, icone: string }>('tituloPagina', () => ({
  titulo: '',
  icone: ''
}));