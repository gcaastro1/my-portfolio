import test from 'node:test'
import assert from 'node:assert/strict'
import projectsData from './projectsData.ts'

test('mostra exatamente os 4 projetos do LinkedIn, na mesma ordem', () => {
  assert.deepEqual(
    projectsData.map((project) => project.title),
    ['Disputa VM', 'DropMailer', 'MyConts', 'Startemy'],
  )
})

test('todo projeto tem rótulo e descrição em PT e EN', () => {
  for (const project of projectsData) {
    for (const field of [project.label, project.description]) {
      assert.ok(field.en.trim().length > 0, `${project.title}: texto em inglês vazio`)
      assert.ok(field.pt.trim().length > 0, `${project.title}: texto em português vazio`)
    }
  }
})

test('projeto "live" tem link do site; nenhum projeto fica oculto ou "em breve"', () => {
  for (const project of projectsData) {
    assert.notEqual(project.status, 'coming-soon', `${project.title}: ainda "em breve"`)
    assert.equal(project.visible, true, `${project.title}: oculto`)
    if (project.status === 'live') {
      assert.match(project.deploy ?? '', /^https:\/\//, `${project.title}: sem link do site`)
    }
  }
})

test('links externos usam https e só aparecem os que o LinkedIn informa', () => {
  const links = projectsData.flatMap((project) =>
    [project.deploy, project.repository].filter(Boolean),
  )
  for (const link of links) assert.match(link, /^https:\/\//)
  assert.deepEqual(links.sort(), [
    'https://disputa-vm-xldt.vercel.app',
    'https://dropmailer-gen.vercel.app/',
    'https://github.com/gcaastro1/tempmail-gen',
  ].sort())
})

test('ids são únicos', () => {
  const ids = projectsData.map((project) => project.id)
  assert.equal(new Set(ids).size, ids.length)
})
