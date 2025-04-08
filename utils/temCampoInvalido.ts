export function temCampoInvalido(objeto: object, camposObrigatorios?: string[]) {
  let resultado = false

  Object.entries(objeto).forEach(([key, value]) => {
    if (camposObrigatorios) {
      if (camposObrigatorios.includes(key)) {
        if (value === '' || value === null || value === undefined) {
          resultado = true
        }
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        resultado = true
      }
    }
  })
  return resultado
}