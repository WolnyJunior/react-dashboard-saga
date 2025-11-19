// Arquivo para pequenas funções reutilizáveis
// Exemplo simples:
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
