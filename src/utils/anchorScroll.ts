// Barra de título (44px = --titlebar-h) + respiro entre ela e o título da seção.
export const TITLEBAR_HEIGHT = 44
export const ANCHOR_GAP = 24

// Posição de rolagem que deixa o conteúdo da seção (depois do padding-top dela)
// logo abaixo da barra de título. `rectTop` vem de getBoundingClientRect().top.
export function anchorScrollTop(
  rectTop: number,
  scrollY: number,
  paddingTop: number,
): number {
  const top = rectTop + scrollY + paddingTop - TITLEBAR_HEIGHT - ANCHOR_GAP
  return Math.max(0, Math.round(top))
}
