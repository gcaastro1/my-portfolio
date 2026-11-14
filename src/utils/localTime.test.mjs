import test from 'node:test'
import assert from 'node:assert/strict'
import { formatLocalTime } from './localTime.ts'

test('converte um instante UTC para Santo André (UTC-3)', () => {
  assert.equal(formatLocalTime(new Date('2026-11-14T15:30:00Z')), '12:30')
})

test('completa hora e minuto com zero à esquerda', () => {
  assert.equal(formatLocalTime(new Date('2026-11-14T12:05:00Z')), '09:05')
})

test('meia-noite aparece como 00:xx, nunca 24:xx', () => {
  assert.equal(formatLocalTime(new Date('2026-11-14T03:07:00Z')), '00:07')
})

test('respeita um fuso informado', () => {
  assert.equal(
    formatLocalTime(new Date('2026-11-14T15:30:00Z'), 'Europe/Rome'),
    '16:30',
  )
})
