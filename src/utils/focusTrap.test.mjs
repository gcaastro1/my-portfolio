import test from 'node:test'
import assert from 'node:assert/strict'
import { nextFocusIndex } from './focusTrap.ts'

test('Tab no último elemento volta para o primeiro', () => {
  assert.equal(nextFocusIndex(6, 7, false), 0)
})

test('Shift+Tab no primeiro elemento vai para o último', () => {
  assert.equal(nextFocusIndex(0, 7, true), 6)
})

test('no meio da lista anda um passo para a frente ou para trás', () => {
  assert.equal(nextFocusIndex(2, 7, false), 3)
  assert.equal(nextFocusIndex(2, 7, true), 1)
})

test('foco fora do diálogo (índice -1) entra pelo primeiro ou pelo último', () => {
  assert.equal(nextFocusIndex(-1, 7, false), 0)
  assert.equal(nextFocusIndex(-1, 7, true), 6)
})

test('sem elementos focáveis devolve -1', () => {
  assert.equal(nextFocusIndex(-1, 0, false), -1)
})
