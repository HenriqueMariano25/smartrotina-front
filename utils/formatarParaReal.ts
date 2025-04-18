export function formatarParaReal(valor: number | string): string {
  // Se vier como string com vírgula, troca por ponto
  const numero = typeof valor === 'string'
    ? parseFloat(valor.replace('.', '').replace(',', '.'))
    : valor

  if (isNaN(numero)) return 'R$ 0,00'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(numero)
}