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

const sectionBlock = reset.slice(reset.indexOf('\n.section {'), reset.indexOf('\n.skip-link {'))

test('seção ancorada deixa o título logo abaixo da barra de título (scroll-margin negativo)', () => {
  assert.match(sectionBlock, /scroll-margin-top:\s*calc\(2\.4rem - 9\.6rem\)/)
  assert.match(
    sectionBlock,
    /@include breakpoint\(md\)\s*\{[^}]*scroll-margin-top:\s*calc\(2\.4rem - 13rem\)/,
  )
})

test('html só reserva a altura da barra de título no topo', () => {
  assert.match(htmlBlock, /scroll-padding-top:\s*var\(--titlebar-h\)\s*;/)
})
