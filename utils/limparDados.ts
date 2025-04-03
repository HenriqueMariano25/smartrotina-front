export function limparDados<T extends Record<string, any>>(dados: T): T {
  return Object.fromEntries(
    Object.entries(dados).map(([key, value]) => {
      if (typeof value === "string") {
        const trimmed = value.trim();
        return [key, trimmed === "" ? null : trimmed];
      }
      return [ key, value]
    })
  ) as T
}