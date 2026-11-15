import test from 'node:test'
import assert from 'node:assert/strict'
import { anchorScrollTop } from './anchorScroll.ts'

// O título da seção começa logo abaixo da barra de título (44px) + 24px de respiro.
test('posiciona o conteúdo da seção a 68px do topo da tela', () => {
  // seção a 1000px do topo da tela, página em 0, padding-top 130px
  assert.equal(anchorScrollTop(1000, 0, 130), 1000 + 130 - 68)
})

test('soma a rolagem atual, porque o retângulo é relativo à tela', () => {
  assert.equal(anchorScrollTop(300, 2000, 96), 300 + 2000 + 96 - 68)
})

test('nunca devolve posição negativa', () => {
  assert.equal(anchorScrollTop(-200, 0, 0), 0)
  assert.equal(anchorScrollTop(10, 0, 20), 0)
})

test('arredonda para pixel inteiro', () => {
  assert.equal(Number.isInteger(anchorScrollTop(1000.4, 0.3, 129.6)), true)
})
