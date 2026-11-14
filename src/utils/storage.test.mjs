import test from 'node:test'
import assert from 'node:assert/strict'
import { readStored, writeStored } from './storage.ts'

const blockedStorage = {
  getItem() {
    throw new Error('SecurityError')
  },
  setItem() {
    throw new Error('SecurityError')
  },
}

function memoryStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => void data.set(key, String(value)),
  }
}

test('readStored devolve null quando o storage está bloqueado', () => {
  globalThis.localStorage = blockedStorage
  assert.equal(readStored('@Theme'), null)
})

test('writeStored não lança quando o storage está bloqueado', () => {
  globalThis.localStorage = blockedStorage
  assert.doesNotThrow(() => writeStored('@Theme', 'light'))
})

test('grava e lê o mesmo valor quando o storage funciona', () => {
  globalThis.localStorage = memoryStorage()
  writeStored('@Language', 'pt')
  assert.equal(readStored('@Language'), 'pt')
})

test('chave inexistente devolve null', () => {
  globalThis.localStorage = memoryStorage()
  assert.equal(readStored('@Missing'), null)
})
