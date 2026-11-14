import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const reset = readFileSync(new URL('./_reset.scss', import.meta.url), 'utf8').replace(
  /\r\n/g,
  '\n',
)
const htmlBlock = reset.slice(reset.indexOf('\nhtml {'), reset.indexOf('\nbody {'))

test('html reserva espaço embaixo para a barra de status e o trilho no celular', () => {
  assert.match(
    htmlBlock,
    /scroll-padding-bottom:\s*calc\(var\(--statusbar-h\)\s*\+\s*var\(--rail-h\)\)/,
  )
})

test('html só reserva a barra de status quando o trilho vai para a lateral (md)', () => {
  assert.match(
    htmlBlock,
    /@include breakpoint\(md\)\s*\{[^}]*scroll-padding-bottom:\s*var\(--statusbar-h\)/,
  )
})
