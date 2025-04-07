export function temCampoInvalido(objeto: object) {
  return Object.values(objeto).some((valor) =>
    valor === '' || valor === null || valor === undefined
  )
}