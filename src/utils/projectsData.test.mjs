import test from 'node:test'
import assert from 'node:assert/strict'
import projectsData from './projectsData.ts'

test('mostra os 4 projetos do LinkedIn na ordem e, por último, o portfólio', () => {
  assert.deepEqual(
    projectsData.map((project) => project.title),
    ['Disputa VM', 'DropMailer', 'MyConts', 'Startemy', 'Portfolio Website'],
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

test('links externos usam https e são só os informados pelo usuário', () => {
  const links = projectsData.flatMap((project) =>
    [project.deploy, project.repository].filter(Boolean),
  )
  for (const link of links) assert.match(link, /^https:\/\//)
  assert.deepEqual(links.sort(), [
    'https://disputa-vm-xldt.vercel.app',
    'https://dropmailer-gen.vercel.app/',
    'https://github.com/gcaastro1/my-portfolio',
    'https://github.com/gcaastro1/startemy-project',
    'https://github.com/gcaastro1/tempmail-gen',
    'https://gustavolima.vercel.app',
  ].sort())
})

test('ids são únicos', () => {
  const ids = projectsData.map((project) => project.id)
  assert.equal(new Set(ids).size, ids.length)
})

test('imagens dos projetos apontam para arquivos existentes em public/', async () => {
  const { existsSync } = await import('node:fs')
  for (const project of projectsData) {
    if (!project.image) continue
    const file = new URL('../../public' + project.image, import.meta.url)
    assert.ok(existsSync(file), project.title + ': ' + project.image + ' não existe')
  }
})

test('Disputa VM, DropMailer, Startemy e Portfolio têm miniatura', () => {
  const withImage = projectsData.filter((project) => project.image).map((project) => project.title)
  assert.deepEqual(withImage, ['Disputa VM', 'DropMailer', 'Startemy', 'Portfolio Website'])
})
