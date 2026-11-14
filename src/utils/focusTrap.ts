// Índice do próximo elemento focável ao apertar Tab (ou Shift+Tab) dentro de um diálogo.
// `current` é o índice do elemento com foco, ou -1 se o foco está fora da lista.
export function nextFocusIndex(
  current: number,
  total: number,
  backwards: boolean,
): number {
  if (total <= 0) return -1
  if (current < 0) return backwards ? total - 1 : 0
  return (current + (backwards ? -1 : 1) + total) % total
}
