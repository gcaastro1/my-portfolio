# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar o portfólio no estilo IDE (hero centralizado com 3D, trilho lateral, barra de título e de status), com acento laranja e temas claro e escuro.

**Architecture:** Só a camada visual muda. Dados (`src/utils/*Data.ts`), contexts e CV ficam. Os tokens de tema passam a viver em `html[data-theme]` (definido por script inline antes da hidratação, sem flash). Uma moldura fixa (`TitleBar`, `SideRail`, `StatusBar`) envolve o `<main>`. As seções existentes ganham um `EditorPanel` e herdam as cores pelos tokens.

**Tech Stack:** Next 13.4.10 (app router), React 18.2, TypeScript 5.1, SCSS modules, Framer Motion, `three@0.160.1`, `@react-three/fiber@8.15.19`, `@react-three/drei@9.99.0`, `lenis`.

**Spec:** `docs/superpowers/specs/2026-11-14-portfolio-redesign-design.md`

## Global Constraints

- Git: todo comando git neste projeto precisa de `-c safe.directory=D:/Projetos/my-portfolio` (erro "dubious ownership" sem isso). Não alterar a config global.
- Trabalhar na branch `feat/redesign`. Um commit por tarefa. Rodapé de commit: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Acento escuro `#ff7a1a`; acento claro `#c2410c` (o `#d85a00` do spec falha AA: 3,9:1; `#c2410c` dá 5,2:1). Task 1 corrige o spec.
- Texto e controles: contraste AA (≥ 4,5:1) nos dois temas.
- Fontes: JetBrains Mono (rótulos, barras, código) e Inter (texto) via `next/font/google`.
- Local na barra de status: "Santo André, SP", horário em `America/Sao_Paulo`.
- 3D: só monta com `(min-width: 1024px)` e sem `prefers-reduced-motion: reduce`; carregado com `next/dynamic` (`ssr: false`).
- Mantém i18n PT/EN (`translations` em `src/utils/i18n.ts`, tipado `as const`), CV `.docx`, `CommandPalette` (Ctrl+K), `SkipLink`.
- Não há test runner no projeto. Lógica pura (`localTime`) é testada com `node --test` (Node 24 executa `.ts` direto). O resto é verificado com `npx tsc --noEmit`, `npm run lint`, `npm run build` e conferência no navegador (`npm run dev`, porta 3000).
- Medidas: `:root { font-size: 62.5% }`, então `1rem = 10px`. Variáveis de layout: `--titlebar-h: 4.4rem`, `--statusbar-h: 3.6rem`, `--rail-w: 5.6rem`, `--rail-h: 5.2rem`.

## Review Focus

1. WebGL indisponível ou contexto perdido: o hero deve cair para o brilho CSS, sem quebrar a página (teste na Task 8).
2. Viewport cruzando 1024px ou `prefers-reduced-motion` alternando em tempo de execução: o 3D monta e desmonta sem recarregar (Task 8).
3. Relógio da barra de status: HTML do servidor e do cliente iguais (`--:--` até montar), sem erro de hidratação (Task 2 e 5).
4. Barras fixas cobrindo conteúdo e âncoras: link `/#projects` aberto direto, foco por teclado e barra inferior no celular não podem esconder títulos nem o fim do contato (Tasks 4, 5 e 6).
5. Tema salvo inválido ou `localStorage` bloqueado: cai em escuro, sem lançar exceção (Task 1).

---

## File Structure

**Criar**
- `src/utils/sections.ts`: ids das seções.
- `src/utils/localTime.ts` e `src/utils/localTime.test.mjs`: formatação do horário local e seu teste.
- `src/utils/smoothScroll.ts`: instância do Lenis e `scrollToHash` / `onAnchorClick`.
- `src/utils/events.ts`: nome do evento que abre a paleta.
- `src/hooks/useMediaQuery.ts`, `useLocalTime.ts`, `useActiveSection.ts`.
- `src/components/TitleBar/{index.tsx,ThemeSwitcher.tsx,style.module.scss}`.
- `src/components/SideRail/{index.tsx,style.module.scss}`.
- `src/components/StatusBar/{index.tsx,style.module.scss}`.
- `src/components/EditorPanel/{index.tsx,style.module.scss}`.
- `src/components/HeroScene/{index.tsx,Scene.tsx,SceneBoundary.tsx,style.module.scss}`.
- `src/components/SmoothScroll/index.tsx`.
- `public/fonts/helvetiker_bold.typeface.json` (copiada de `three`).

**Modificar**
- `next.config.js`, `src/app/layout.tsx`, `src/app/page.tsx`.
- `src/contexts/ThemeContext/index.tsx`.
- `src/scss/base/_reset.scss`, `src/scss/abstracts/_variables.scss`, `src/scss/_typography.scss`.
- `src/utils/i18n.ts`.
- `src/components/Header/{index.tsx,style.module.scss}` (hero).
- `src/components/SectionHeading/style.module.scss`.
- `src/components/{About,Experience,Stack,Projects,Contacts}/{index.tsx,style.module.scss}`.
- `src/components/CommandPalette/{index.tsx,style.module.scss}`.

**Remover**
- `src/components/Navbar/` (inteiro), `src/components/Footer/`, `src/components/CustomCursor/`.

---

### Task 0: Branch, dependências e linha de base

**Files:**
- Modify: `package.json`, `package-lock.json`, `next.config.js`
- Create: `public/fonts/helvetiker_bold.typeface.json`

**Interfaces:**
- Produces: pacotes `three`, `@react-three/fiber`, `@react-three/drei`, `lenis` instalados; fonte typeface em `/fonts/helvetiker_bold.typeface.json`.

- [ ] **Step 1: Criar a branch e conferir a linha de base**

```bash
cd /d/Projetos/my-portfolio
git -c safe.directory=D:/Projetos/my-portfolio checkout -b feat/redesign
npm run build
```
Expected: build conclui sem erro. Se falhar, anote o erro: ele já existia antes do redesign. Pare e avise o usuário.

- [ ] **Step 2: Instalar dependências**

```bash
npm install three@0.160.1 @react-three/fiber@8.15.19 @react-three/drei@9.99.0 lenis@^1.1.20
npm install -D @types/three@0.160.0
```
Expected: instala sem conflito de peer deps com React 18.2. Se houver `ERESOLVE`, não use `--force`: confira as versões acima com `npm view @react-three/drei@9.99.0 peerDependencies` e ajuste.

- [ ] **Step 3: Copiar a fonte typeface**

```bash
mkdir -p public/fonts
cp node_modules/three/examples/fonts/helvetiker_bold.typeface.json public/fonts/
ls -la public/fonts
```
Expected: arquivo listado (≈ 100 KB).

- [ ] **Step 4: Transpilar o `three` no Next**

Em `next.config.js`, deixar:

```js
const path = require('path')

/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['three'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'scss')],
  },
}

module.exports = nextConfig
```

- [ ] **Step 5: Conferir que o build ainda passa e commitar**

```bash
npm run build
git -c safe.directory=D:/Projetos/my-portfolio add package.json package-lock.json next.config.js public/fonts
git -c safe.directory=D:/Projetos/my-portfolio commit -m "chore: add three, r3f, drei and lenis for redesign

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```
Expected: build OK; commit criado.

---

### Task 1: Tokens, fontes e tema por `html[data-theme]`

**Files:**
- Modify: `src/scss/base/_reset.scss`, `src/scss/abstracts/_variables.scss`, `src/scss/_typography.scss`, `src/app/layout.tsx`, `src/contexts/ThemeContext/index.tsx`, `docs/superpowers/specs/2026-11-14-portfolio-redesign-design.md`

**Interfaces:**
- Produces: variáveis CSS globais usadas por todas as tarefas: `--bg --bg-elevated --surface --surface-strong --surface-soft --text --text-muted --line --line-strong --accent --accent-strong --accent-secondary --on-accent --shadow --glow --glow-soft --syn-keyword --syn-string --syn-type --font-sans --font-mono --radius --titlebar-h --statusbar-h --rail-w --rail-h`. Atributo `data-theme="dark|light"` em `<html>`.
- Consumes: `ThemeContext` existente (`theme`, `setTheme`).

- [ ] **Step 1: Verificar contraste dos tokens (deve passar antes de escrever)**

```bash
node -e "
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const cr=(a,b)=>{const[x,y]=[lum(a),lum(b)].sort((p,q)=>q-p);return ((x+.05)/(y+.05))};
const pairs=[['dark text','#ededed','#0b0b0c'],['dark muted','#8b8b93','#0b0b0c'],['dark accent','#ff7a1a','#0b0b0c'],['dark on-accent','#1a1a1a','#ff7a1a'],['dark string','#7fd69a','#141416'],['dark type','#7db4ff','#141416'],['light text','#1a1a1a','#f6f4f1'],['light muted','#6b655d','#f6f4f1'],['light accent','#c2410c','#f6f4f1'],['light on-accent','#ffffff','#c2410c'],['light string','#15803d','#ffffff'],['light type','#1d4ed8','#ffffff']];
let bad=0;for(const[n,a,b]of pairs){const r=cr(a,b);if(r<4.5)bad++;console.log(n,r.toFixed(2),r>=4.5?'OK':'FALHA')}
process.exit(bad?1:0)"
```
Expected: todas `OK`, exit 0.

- [ ] **Step 2: Variáveis SCSS e tipografia**

Em `src/scss/abstracts/_variables.scss`, trocar a linha da fonte:

```scss
$text-font-stack: var(--font-sans), 'Inter', 'Arial', sans-serif;
$mono-font-stack: var(--font-mono), 'JetBrains Mono', 'Courier New', monospace;
```

Em `src/scss/_typography.scss`, trocar `color: $color-gray-100;` por `color: var(--text);`.

- [ ] **Step 3: Reescrever o bloco de tokens em `_reset.scss`**

Em `src/scss/base/_reset.scss`:

1. Dentro de `html { ... }`, trocar `scroll-padding-top: 9rem;` por `scroll-padding-top: calc(var(--titlebar-h) + 2rem);`.
2. Em `body { ... }`, trocar `background: #070a0f;` por `background: var(--bg);` e adicionar `color: var(--text);`.
3. Trocar `::selection` por:

```scss
::selection {
  color: var(--on-accent);
  background: var(--accent);
}
```

4. Substituir **todo** o bloco que começa em `.dark,\n.light {` até o fim do bloco `.light { ... }` (linhas 70 a 107) por:

```scss
:root,
html[data-theme='dark'] {
  --bg: #0b0b0c;
  --bg-elevated: #101012;
  --surface: #141416;
  --surface-strong: #1b1b1e;
  --surface-soft: rgba(255, 255, 255, 0.04);
  --text: #ededed;
  --text-muted: #8b8b93;
  --line: #26262a;
  --line-strong: #3a3a40;
  --accent: #ff7a1a;
  --accent-strong: #ff9a4d;
  --accent-secondary: #7db4ff;
  --on-accent: #1a1a1a;
  --shadow: rgba(0, 0, 0, 0.5);
  --glow: rgba(255, 122, 26, 0.22);
  --glow-soft: rgba(255, 122, 26, 0.08);
  --syn-keyword: var(--accent);
  --syn-string: #7fd69a;
  --syn-type: #7db4ff;
  color-scheme: dark;
}

html[data-theme='light'] {
  --bg: #f6f4f1;
  --bg-elevated: #ffffff;
  --surface: #ffffff;
  --surface-strong: #efebe6;
  --surface-soft: rgba(0, 0, 0, 0.04);
  --text: #1a1a1a;
  --text-muted: #6b655d;
  --line: #e2ddd6;
  --line-strong: #c9c2b8;
  --accent: #c2410c;
  --accent-strong: #9a3412;
  --accent-secondary: #1d4ed8;
  --on-accent: #ffffff;
  --shadow: rgba(60, 40, 20, 0.12);
  --glow: rgba(194, 65, 12, 0.14);
  --glow-soft: rgba(194, 65, 12, 0.05);
  --syn-string: #15803d;
  --syn-type: #1d4ed8;
  color-scheme: light;
}

:root {
  --radius: 0.8rem;
  --titlebar-h: 4.4rem;
  --statusbar-h: 3.6rem;
  --rail-w: 5.6rem;
  --rail-h: 5.2rem;
}

body {
  transition: color 250ms ease, background-color 250ms ease;
}
```

5. Substituir o bloco `.site-shell { ... }` por:

```scss
.site-shell {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  padding-top: var(--titlebar-h);
  padding-bottom: calc(var(--statusbar-h) + var(--rail-h));
  background: var(--bg);

  @include breakpoint(md) {
    padding-bottom: var(--statusbar-h);
    padding-left: var(--rail-w);
  }
}
```

6. Em `.skip-link`, trocar `color: #070a0f;` por `color: var(--on-accent);`.
7. Apagar o bloco `html.hasCustomCursor, html.hasCustomCursor * { ... }` (o cursor customizado será removido na Task 6).

- [ ] **Step 4: Fontes e script de tema em `layout.tsx`**

Reescrever o final de `src/app/layout.tsx` (manter `metadata` como está):

```tsx
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../scss/main.scss'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const themeScript = `try{var t=localStorage.getItem('@Theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

// ...export const metadata (inalterado)...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
```

`--font-sans` e `--font-mono` vêm só do `next/font` (classe no `<html>`); `$text-font-stack` e `$mono-font-stack` já têm fontes de reserva.

- [ ] **Step 5: `ThemeProvider` grava o atributo e tolera `localStorage` bloqueado**

Substituir `src/contexts/ThemeContext/index.tsx` inteiro:

```tsx
'use client'

import React, { useEffect, useState } from 'react'
import { Theme, ThemeContextProps, ThemeProviderProps } from './props'

export const initialThemeState = {
  theme: 'dark' as Theme,
}

const ThemeContext = React.createContext({
  theme: initialThemeState.theme,
} as ThemeContextProps)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(initialThemeState.theme)
  // Só grava depois de ler o tema salvo; senão o 'dark' inicial sobrescreve a preferência.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('@Theme')
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme)
      }
    } catch {
      // storage bloqueado: segue com o tema escuro
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('@Theme', theme)
    } catch {
      // storage bloqueado: o tema só vale para esta sessão
    }
  }, [theme, ready])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
```

- [ ] **Step 6: Corrigir o spec**

No spec `docs/superpowers/specs/2026-11-14-portfolio-redesign-design.md`:
- Na tabela de tokens, trocar `--border` por `--line` e o acento claro `#d85a00 (contraste AA sobre claro)` por `#c2410c (AA: 5,2:1 sobre branco)`.
- Em "Identidade visual", trocar "Tokens como variáveis CSS em `:root` (claro) e `html.dark` (escuro)" por "Tokens como variáveis CSS em `html[data-theme='dark'|'light']`, definidos por script inline antes da hidratação (sem flash)".
- Em "Trilho lateral", trocar "ícones início, sobre, experiência, projetos, contato" por "ícones início, sobre, experiência, projetos, tecnologias, contato".
- Em "Acessibilidade e desempenho", trocar "Troca o `CustomCursor` por versão discreta ou o remove se atrapalhar (decidir na implementação, com teste manual)" por "Remove o `CustomCursor` (esconde o cursor nativo e a referência não usa)".

- [ ] **Step 7: Verificar**

```bash
npx tsc --noEmit
npm run dev
```
No navegador em `http://localhost:3000`: a página abre escura (o resto do layout ainda é o antigo, e pode estar feio: esperado). No console do navegador:

```js
localStorage.setItem('@Theme','light'); location.reload()
```
Expected: `document.documentElement.dataset.theme === 'light'` logo após o carregamento e sem piscar escuro→claro. Depois:

```js
localStorage.setItem('@Theme','xyz'); location.reload()
```
Expected: `dataset.theme === 'dark'`, sem erro no console. `npx tsc --noEmit` sem erros.

- [ ] **Step 8: Commit**

```bash
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: add orange design tokens, fonts and html data-theme

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Utilitários, hooks e textos (i18n)

**Files:**
- Create: `src/utils/sections.ts`, `src/utils/localTime.ts`, `src/utils/localTime.test.mjs`, `src/utils/smoothScroll.ts`, `src/utils/events.ts`, `src/hooks/useMediaQuery.ts`, `src/hooks/useLocalTime.ts`, `src/hooks/useActiveSection.ts`
- Modify: `src/utils/i18n.ts`

**Interfaces:**
- Produces:
  - `sectionIds: readonly ['home','about','experience','projects','stack','contact']`, `type SectionId`
  - `LOCAL_TIMEZONE: string`, `formatLocalTime(date: Date, timeZone?: string): string` (formato `HH:MM`, 24h)
  - `setSmoothScroll(instance: Lenis | null): void`, `scrollToHash(hash: string): void`, `onAnchorClick(event: React.MouseEvent<HTMLAnchorElement>): void`
  - `OPEN_PALETTE_EVENT: 'open-command-palette'`
  - `useMediaQuery(query: string): boolean` (false no servidor)
  - `useLocalTime(): string` (`'--:--'` até montar)
  - `useActiveSection(): [SectionId, (id: SectionId) => void]`
  - Chaves i18n novas: `translations[lang].statusBar.{basedIn,place,localTime,cta,palette,social}`, `translations[lang].hero.greeting.{pre,accent,post}`, `translations[lang].palette.{placeholder,empty,commands.*}`.

- [ ] **Step 1: Escrever o teste que falha**

`src/utils/localTime.test.mjs`:

```js
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
```

- [ ] **Step 2: Rodar e ver falhar**

```bash
node --test src/utils/localTime.test.mjs
```
Expected: FAIL (`Cannot find module './localTime.ts'`).

- [ ] **Step 3: Implementar `localTime.ts`**

```ts
export const LOCAL_TIMEZONE = 'America/Sao_Paulo'

export function formatLocalTime(
  date: Date,
  timeZone: string = LOCAL_TIMEZONE,
): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone,
  }).format(date)
}
```

- [ ] **Step 4: Rodar e ver passar**

```bash
node --test src/utils/localTime.test.mjs
```
Expected: 4 testes PASS.

- [ ] **Step 5: Demais utilitários**

`src/utils/sections.ts`:

```ts
export const sectionIds = [
  'home',
  'about',
  'experience',
  'projects',
  'stack',
  'contact',
] as const

export type SectionId = (typeof sectionIds)[number]
```

`src/utils/events.ts`:

```ts
export const OPEN_PALETTE_EVENT = 'open-command-palette'
```

`src/utils/smoothScroll.ts`:

```ts
import type Lenis from 'lenis'
import type { MouseEvent } from 'react'

let instance: Lenis | null = null

// Mantenha em sincronia com --titlebar-h (4.4rem = 44px com root 62.5%).
const TITLEBAR_OFFSET = 44

export const setSmoothScroll = (lenis: Lenis | null) => {
  instance = lenis
}

export function scrollToHash(hash: string): void {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return

  if (instance) {
    instance.scrollTo(target, { offset: -TITLEBAR_OFFSET })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
  window.history.pushState(null, '', hash)
}

export function onAnchorClick(event: MouseEvent<HTMLAnchorElement>): void {
  const hash = event.currentTarget.hash
  if (!hash) return
  event.preventDefault()
  scrollToHash(hash)
}
```

- [ ] **Step 6: Hooks**

`src/hooks/useMediaQuery.ts`:

```ts
'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setMatches(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [query])

  return matches
}
```

`src/hooks/useLocalTime.ts`:

```ts
'use client'

import { useEffect, useState } from 'react'
import { formatLocalTime } from '@/utils/localTime'

export function useLocalTime(): string {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const tick = () => setTime(formatLocalTime(new Date()))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [])

  return time
}
```

`src/hooks/useActiveSection.ts`:

```ts
'use client'

import { useEffect, useState } from 'react'
import { SectionId, sectionIds } from '@/utils/sections'

export function useActiveSection(): [SectionId, (id: SectionId) => void] {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        })
      },
      // faixa de 20% no meio da tela: seções altas também disparam
      { rootMargin: '-40% 0px -40% 0px' },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return [active, setActive]
}
```

- [ ] **Step 7: Textos PT/EN em `i18n.ts`**

Em `translations.en`:
- Em `hero`: remover `terminalFile`, `terminalRole`, `terminalFocus`, `terminalHeadline`, `terminalSubtitle`; adicionar `greeting: { pre: "Hi, I'm Gustavo, a", accent: 'front-end', post: 'developer' },`.
- Trocar o bloco `footer: {...}` por:

```ts
statusBar: {
  basedIn: 'Based in',
  place: 'Santo André, SP',
  localTime: 'Local time',
  cta: "let's-work-together",
  palette: 'Open command menu',
  social: 'Social links',
},
palette: {
  placeholder: 'Type a command or search...',
  empty: 'No commands found.',
  themeDark: 'Switch to Dark Theme',
  themeLight: 'Switch to Light Theme',
  langEn: 'Switch Language to English',
  langPt: 'Switch Language to Portuguese',
  goProjects: 'Go to Projects',
  goContact: 'Go to Contact',
},
```

Em `translations.pt`:
- `hero`: remover as mesmas chaves `terminal*`; adicionar `greeting: { pre: 'Oi, eu sou o Gustavo,', accent: 'desenvolvedor', post: 'front-end' },`.
- Trocar `footer` por:

```ts
statusBar: {
  basedIn: 'Baseado em',
  place: 'Santo André, SP',
  localTime: 'Horário local',
  cta: 'vamos-trabalhar-juntos',
  palette: 'Abrir menu de comandos',
  social: 'Redes e contato',
},
palette: {
  placeholder: 'Digite um comando ou busque...',
  empty: 'Nenhum comando encontrado.',
  themeDark: 'Mudar para o tema escuro',
  themeLight: 'Mudar para o tema claro',
  langEn: 'Mudar idioma para inglês',
  langPt: 'Mudar idioma para português',
  goProjects: 'Ir para Projetos',
  goContact: 'Ir para Contato',
},
```

- [ ] **Step 8: Verificar e commitar**

`npx tsc --noEmit` vai apontar o uso das chaves `terminal*` removidas em `src/components/Header/index.tsx`, que a Task 7 reescreve. Espere erros só nesse arquivo; qualquer outro erro precisa ser corrigido agora.

```bash
node --test src/utils/localTime.test.mjs
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: add layout utils, hooks, local time and new i18n keys

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Barra de título (`TitleBar`)

**Files:**
- Create: `src/components/TitleBar/index.tsx`, `src/components/TitleBar/ThemeSwitcher.tsx`, `src/components/TitleBar/style.module.scss`

**Interfaces:**
- Consumes: `LanguageContext` (`language`, `setLanguage`), `ThemeContext` (`theme`, `setTheme`), `translations[lang].nav.{languageLabel,switchToDark,switchToLight}`, `onAnchorClick`.
- Produces: `<TitleBar />` fixo no topo, altura `var(--titlebar-h)`, `z-index: 100`.

- [ ] **Step 1: `ThemeSwitcher.tsx`**

```tsx
'use client'

import { MoonStars, Sun } from '@phosphor-icons/react'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { ThemeContext } from '@/contexts/ThemeContext'
import { translations } from '@/utils/i18n'
import styles from './style.module.scss'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  const { language } = useContext(LanguageContext)
  const copy = translations[language].nav
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? copy.switchToLight : copy.switchToDark}
    >
      {isDark ? (
        <Sun size={16} weight="bold" />
      ) : (
        <MoonStars size={16} weight="bold" />
      )}
    </button>
  )
}

export default ThemeSwitcher
```

- [ ] **Step 2: `index.tsx`**

```tsx
'use client'

import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import { onAnchorClick } from '@/utils/smoothScroll'
import ThemeSwitcher from './ThemeSwitcher'
import styles from './style.module.scss'

const TitleBar = () => {
  const { language, setLanguage } = useContext(LanguageContext)
  const copy = translations[language].nav

  return (
    <header className={styles.titlebar}>
      <span className={styles.titlebar__dots} aria-hidden="true">
        <i />
        <i />
        <i />
      </span>

      <a className={styles.titlebar__title} href="#home" onClick={onAnchorClick}>
        gustavo <span>&lt;lima&gt;</span>
      </a>

      <div className={styles.titlebar__actions}>
        <div
          className={styles.language}
          role="group"
          aria-label={copy.languageLabel}
        >
          <button
            type="button"
            className={language === 'en' ? styles.language__active : ''}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
          <button
            type="button"
            className={language === 'pt' ? styles.language__active : ''}
            onClick={() => setLanguage('pt')}
            aria-pressed={language === 'pt'}
          >
            PT
          </button>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  )
}

export default TitleBar
```

- [ ] **Step 3: `style.module.scss`**

```scss
@use 'abstracts' as *;

.titlebar {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  display: grid;
  height: var(--titlebar-h);
  padding-inline: 1.6rem;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  backdrop-filter: blur(10px);
  font-family: $mono-font-stack;

  &__dots {
    display: none;
    gap: 0.6rem;

    @include breakpoint(md) {
      display: flex;
    }

    i {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 50%;
      background: var(--line-strong);
    }
  }

  &__title {
    grid-column: 2;
    color: var(--text);
    font-size: 1.3rem;
    font-weight: 600;

    span {
      color: var(--accent);
    }
  }

  &__actions {
    display: flex;
    grid-column: 3;
    justify-content: flex-end;
    align-items: center;
    gap: 0.8rem;
  }
}

.language {
  display: inline-flex;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;

  button {
    padding: 0.5rem 0.9rem;
    color: var(--text-muted);
    background: transparent;
    font-family: $mono-font-stack;
    font-size: 1.1rem;
    font-weight: 600;

    &:hover {
      color: var(--text);
    }
  }

  &__active {
    color: var(--on-accent) !important;
    background: var(--accent) !important;
  }
}

.iconButton {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  color: var(--text-muted);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: transparent;
  transition: color 160ms ease, border-color 160ms ease;

  &:hover {
    color: var(--accent);
    border-color: var(--line-strong);
  }
}
```

- [ ] **Step 4: Verificar e commitar**

`npx tsc --noEmit` (sem erros novos neste diretório). O componente ainda não está montado na página; a conferência visual fica para a Task 6.

```bash
git -c safe.directory=D:/Projetos/my-portfolio add src/components/TitleBar
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: add IDE-style TitleBar with language and theme toggles

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Trilho lateral (`SideRail`)

**Files:**
- Create: `src/components/SideRail/index.tsx`, `src/components/SideRail/style.module.scss`

**Interfaces:**
- Consumes: `useActiveSection`, `sectionIds`, `onAnchorClick`, `translations[lang].nav.{label,home,about,experience,projects,stack,contact}`.
- Produces: `<SideRail />`: coluna fixa à esquerda (≥ 768px) ou barra fixa acima da barra de status (< 768px), `z-index: 90`.

- [ ] **Step 1: `index.tsx`**

```tsx
'use client'

import {
  Briefcase,
  EnvelopeSimple,
  House,
  SquaresFour,
  Stack as StackIcon,
  User,
} from '@phosphor-icons/react'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { useActiveSection } from '@/hooks/useActiveSection'
import { translations } from '@/utils/i18n'
import { SectionId } from '@/utils/sections'
import { onAnchorClick } from '@/utils/smoothScroll'
import styles from './style.module.scss'

const icons: Record<SectionId, typeof House> = {
  home: House,
  about: User,
  experience: Briefcase,
  projects: SquaresFour,
  stack: StackIcon,
  contact: EnvelopeSimple,
}

const order: SectionId[] = [
  'home',
  'about',
  'experience',
  'projects',
  'stack',
  'contact',
]

const SideRail = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].nav
  const [active, setActive] = useActiveSection()

  return (
    <nav className={styles.rail} aria-label={copy.label}>
      {order.map((id) => {
        const Icon = icons[id]
        const isActive = active === id

        return (
          <a
            key={id}
            href={`#${id}`}
            className={`${styles.rail__link} ${
              isActive ? styles.rail__linkActive : ''
            }`}
            data-label={copy[id]}
            aria-label={copy[id]}
            aria-current={isActive ? 'true' : undefined}
            onClick={(event) => {
              onAnchorClick(event)
              setActive(id)
            }}
          >
            <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
          </a>
        )
      })}
    </nav>
  )
}

export default SideRail
```

- [ ] **Step 2: `style.module.scss`**

```scss
@use 'abstracts' as *;

.rail {
  position: fixed;
  z-index: 90;
  right: 0;
  bottom: var(--statusbar-h);
  left: 0;
  display: flex;
  height: var(--rail-h);
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: blur(10px);

  @include breakpoint(md) {
    top: var(--titlebar-h);
    right: auto;
    bottom: var(--statusbar-h);
    width: var(--rail-w);
    height: auto;
    flex-direction: column;
    justify-content: center;
    gap: 1.4rem;
    border-top: 0;
    border-right: 1px solid var(--line);
  }

  &__link {
    position: relative;
    display: grid;
    width: 4rem;
    height: 4rem;
    place-items: center;
    color: var(--text-muted);
    border-radius: var(--radius);
    transition: color 160ms ease, background-color 160ms ease;

    &:hover {
      color: var(--text);
      background: var(--surface-soft);
    }

    @include breakpoint(md) {
      &:hover::after,
      &:focus-visible::after {
        content: attr(data-label);
        position: absolute;
        left: calc(100% + 1rem);
        padding: 0.5rem 0.9rem;
        color: var(--text);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        background: var(--surface);
        font-family: $mono-font-stack;
        font-size: 1.1rem;
        white-space: nowrap;
        pointer-events: none;
      }
    }
  }

  &__linkActive {
    color: var(--accent);

    &::before {
      content: '';
      position: absolute;
      background: var(--accent);
      bottom: 0.2rem;
      left: 1rem;
      right: 1rem;
      height: 2px;

      @include breakpoint(md) {
        top: 1rem;
        bottom: 1rem;
        left: -0.8rem;
        right: auto;
        width: 2px;
        height: auto;
      }
    }
  }
}
```

- [ ] **Step 3: Verificar e commitar**

`npx tsc --noEmit` sem erros neste diretório.

```bash
git -c safe.directory=D:/Projetos/my-portfolio add src/components/SideRail
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: add SideRail section navigation

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Barra de status (`StatusBar`)

**Files:**
- Create: `src/components/StatusBar/index.tsx`, `src/components/StatusBar/style.module.scss`

**Interfaces:**
- Consumes: `useLocalTime`, `contactsData` (campos `type`, `link`, `title`), `translations[lang].statusBar.*`, `OPEN_PALETTE_EVENT`, `onAnchorClick`.
- Produces: `<StatusBar />` fixa no rodapé, `z-index: 100`, altura `var(--statusbar-h)`. Dispara `window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))` ao clicar no botão da paleta (Task 9 escuta).

- [ ] **Step 1: `index.tsx`**

```tsx
'use client'

import {
  ArrowRight,
  Command,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { useLocalTime } from '@/hooks/useLocalTime'
import { contactsData } from '@/utils/contactsData'
import { OPEN_PALETTE_EVENT } from '@/utils/events'
import { translations } from '@/utils/i18n'
import { onAnchorClick } from '@/utils/smoothScroll'
import styles from './style.module.scss'

const socialIcons = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
} as const

const socials = contactsData.filter(
  (contact): contact is typeof contact & { type: keyof typeof socialIcons } =>
    contact.type in socialIcons,
)

const StatusBar = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].statusBar
  const time = useLocalTime()

  return (
    <footer className={styles.status}>
      <span className={styles.status__dot} aria-hidden="true" />

      <p className={styles.status__place}>
        <span className={styles.status__basedIn}>{copy.basedIn} </span>
        {copy.place}
        <span className={styles.status__time}>
          <span aria-hidden="true"> · </span>
          {copy.localTime} <time>{time}</time>
        </span>
      </p>

      <div className={styles.status__actions}>
        <ul className={styles.status__social} aria-label={copy.social}>
          {socials.map((contact) => {
            const Icon = socialIcons[contact.type]
            const isExternal = !contact.link.startsWith('mailto:')

            return (
              <li key={contact.type}>
                <a
                  href={contact.link}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  aria-label={contact.title[language]}
                >
                  <Icon size={16} />
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className={styles.status__palette}
          onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
          aria-label={copy.palette}
        >
          <Command size={14} />
          <span>K</span>
        </button>

        <a className={styles.status__cta} href="#contact" onClick={onAnchorClick}>
          {copy.cta} <ArrowRight size={12} weight="bold" />
        </a>
      </div>
    </footer>
  )
}

export default StatusBar
```

- [ ] **Step 2: `style.module.scss`**

```scss
@use 'abstracts' as *;

.status {
  position: fixed;
  z-index: 100;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  height: var(--statusbar-h);
  padding-inline: 1.2rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  color: var(--text-muted);
  border-top: 1px solid var(--line);
  background: var(--bg);
  font-family: $mono-font-stack;
  font-size: 1.1rem;

  &__dot {
    flex: none;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: var(--accent);
    box-shadow: 0 0 1rem var(--accent);
  }

  &__place {
    display: flex;
    flex: 1;
    min-width: 0;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @include breakpoint(md) {
      justify-content: center;
    }
  }

  &__basedIn {
    display: none;
    white-space: pre;

    @include breakpoint(sm) {
      display: inline;
    }
  }

  &__time {
    display: none;

    @include breakpoint(sm) {
      display: inline;
    }
  }

  &__actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: 1rem;
  }

  &__social {
    display: none;
    gap: 0.4rem;

    @include breakpoint(md) {
      display: flex;
    }

    a {
      display: grid;
      width: 2.6rem;
      height: 2.6rem;
      place-items: center;
      border-radius: var(--radius);

      &:hover {
        color: var(--accent);
      }
    }
  }

  &__palette {
    display: none;
    padding: 0.3rem 0.7rem;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: transparent;
    font: inherit;

    @include breakpoint(md) {
      display: inline-flex;
    }

    &:hover {
      color: var(--text);
      border-color: var(--line-strong);
    }
  }

  &__cta {
    display: inline-flex;
    padding: 0.5rem 1rem;
    align-items: center;
    gap: 0.6rem;
    color: var(--on-accent);
    border-radius: var(--radius);
    background: var(--accent);
    font-weight: 600;
    white-space: nowrap;
    transition: background-color 160ms ease;

    &:hover {
      background: var(--accent-strong);
    }
  }
}
```

- [ ] **Step 3: Verificar e commitar**

`npx tsc --noEmit` sem erros neste diretório.

```bash
git -c safe.directory=D:/Projetos/my-portfolio add src/components/StatusBar
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: add StatusBar with local time, socials and CTA

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Montar a moldura e remover Navbar, Footer e CustomCursor

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/Navbar/`, `src/components/Footer/`, `src/components/CustomCursor/`

**Interfaces:**
- Consumes: `TitleBar`, `SideRail`, `StatusBar` (Tasks 3 a 5).
- Produces: página com a moldura completa; as seções ainda estão no visual antigo (as próximas tasks atualizam).

- [ ] **Step 1: Reescrever `src/app/page.tsx`**

```tsx
import About from '@/components/About'
import CommandPalette from '@/components/CommandPalette'
import Contacts from '@/components/Contacts'
import Experience from '@/components/Experience'
import Header from '@/components/Header'
import Projects from '@/components/Projects'
import SideRail from '@/components/SideRail'
import SkipLink from '@/components/SkipLink'
import Stack from '@/components/Stack'
import StatusBar from '@/components/StatusBar'
import TitleBar from '@/components/TitleBar'

export default function Home() {
  return (
    <>
      <SkipLink />
      <CommandPalette />
      <TitleBar />
      <SideRail />
      <main className="site-shell" id="main-content">
        <Header />
        <About />
        <Experience />
        <Projects />
        <Stack />
        <Contacts />
      </main>
      <StatusBar />
    </>
  )
}
```

- [ ] **Step 2: Remover os componentes substituídos**

```bash
git -c safe.directory=D:/Projetos/my-portfolio rm -r src/components/Navbar src/components/Footer src/components/CustomCursor
```

- [ ] **Step 3: Verificar**

`npx tsc --noEmit`: o único erro restante esperado é em `src/components/Header/index.tsx` (chaves `terminal*` removidas; a Task 7 reescreve o arquivo). Se houver outro, corrija.

`npm run dev` e abrir `http://localhost:3000` em 1440px e em 375px (navegador embutido: `resize_window`):
- Barra de título no topo, status no rodapé, trilho à esquerda (1440) ou acima do rodapé (375).
- Clicar em cada ícone do trilho rola até a seção e marca o ícone ativo.
- Abrir `http://localhost:3000/#contact` direto: o título da seção não fica escondido pela barra de título.
- No fim da página (contato), nada fica coberto pela barra de status nem pelo trilho (375px incluído).
- Relógio mostra horário de Brasília e o console não mostra aviso de hidratação.

Se o dev server falhar por causa do erro do `Header`, faça os Steps 1 a 2 e só verifique depois da Task 7.

- [ ] **Step 4: Commit**

```bash
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: mount IDE frame and remove old Navbar, Footer and CustomCursor

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Novo hero (sem 3D)

**Files:**
- Modify: `src/components/Header/index.tsx`, `src/components/Header/style.module.scss` (reescrita completa)

**Interfaces:**
- Consumes: `translations[lang].hero.{availability,greeting,description,viewProjects,downloadCv,contactMe,cvNote,cvAlternative,scroll}`, `onAnchorClick`.
- Produces: `<Header />` (seção `#home`) com um slot `<HeroScene />` reservado na Task 8, ainda não importado.

- [ ] **Step 1: Reescrever `index.tsx`**

```tsx
'use client'

import {
  ArrowDownRight,
  DownloadSimple,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import { onAnchorClick } from '@/utils/smoothScroll'
import styles from './style.module.scss'

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
}

const itemAnimation = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const Header = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].hero
  const currentCv =
    language === 'en' ? '/Gustavo_Lima_CV_EN.docx' : '/Gustavo_Lima_CV_PT.docx'
  const alternativeCv =
    language === 'en' ? '/Gustavo_Lima_CV_PT.docx' : '/Gustavo_Lima_CV_EN.docx'

  return (
    <section className={styles.hero} id="home">
      <div className={styles.hero__glow} aria-hidden="true" />

      <div className={`${styles.hero__container} container`}>
        <motion.div
          className={styles.hero__content}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.p className={styles.hero__eyebrow} variants={itemAnimation}>
            <span aria-hidden="true" />
            {copy.availability}
          </motion.p>

          <motion.h1 className={styles.hero__title} variants={itemAnimation}>
            {copy.greeting.pre} <em>{copy.greeting.accent}</em>{' '}
            {copy.greeting.post}
          </motion.h1>

          <motion.p className={styles.hero__description} variants={itemAnimation}>
            {copy.description}
          </motion.p>

          <motion.div className={styles.hero__actions} variants={itemAnimation}>
            <a
              className={styles.hero__primaryAction}
              href="#projects"
              onClick={onAnchorClick}
            >
              {copy.viewProjects} <ArrowDownRight size={18} weight="bold" />
            </a>
            <a className={styles.hero__secondaryAction} href={currentCv} download>
              {copy.downloadCv} <DownloadSimple size={18} weight="bold" />
            </a>
            <a
              className={styles.hero__textAction}
              href="#contact"
              onClick={onAnchorClick}
            >
              {copy.contactMe} <EnvelopeSimple size={17} />
            </a>
          </motion.div>

          <motion.p className={styles.hero__cvNote} variants={itemAnimation}>
            {copy.cvNote}{' '}
            <a href={alternativeCv} download>
              {copy.cvAlternative}
            </a>
          </motion.p>
        </motion.div>
      </div>

      <div className={styles.hero__scroll} aria-hidden="true">
        <span>{copy.scroll}</span>
        <i />
      </div>
    </section>
  )
}

export default Header
```

- [ ] **Step 2: Reescrever `style.module.scss`**

```scss
@use 'abstracts' as *;

.hero {
  position: relative;
  display: grid;
  min-height: calc(100svh - var(--titlebar-h) - var(--statusbar-h));
  padding-block: 8rem 10rem;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  text-align: center;

  &__glow {
    position: absolute;
    z-index: -2;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
        60rem 40rem at 72% 38%,
        var(--glow),
        transparent 70%
      ),
      radial-gradient(52rem 36rem at 18% 82%, var(--glow-soft), transparent 70%);
  }

  &__container {
    position: relative;
    z-index: 1;
    display: grid;
    justify-items: center;
  }

  &__content {
    display: grid;
    max-width: 84rem;
    justify-items: center;
    gap: 2.6rem;
  }

  &__eyebrow {
    display: inline-flex;
    padding: 0.7rem 1.2rem;
    align-items: center;
    gap: 0.8rem;
    color: var(--text-muted);
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--surface-soft);
    font-family: $mono-font-stack;
    font-size: 1.1rem;
    font-weight: 500;

    span {
      width: 0.7rem;
      height: 0.7rem;
      background: var(--accent);
      border-radius: 50%;
      box-shadow: 0 0 1.2rem var(--accent);
      animation: pulse 2s ease-in-out infinite;
    }
  }

  &__title {
    font-size: clamp(4rem, 8.4vw, 9rem);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 1.03;
    text-wrap: balance;

    em {
      color: var(--accent);
      font-style: normal;
    }
  }

  &__description {
    max-width: 58rem;
    color: var(--text-muted);
    font-size: 1.7rem;
    line-height: 1.7;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
  }

  &__primaryAction,
  &__secondaryAction {
    display: inline-flex;
    min-height: 4.6rem;
    padding: 1.1rem 1.8rem;
    align-items: center;
    gap: 0.8rem;
    border-radius: var(--radius);
    font-size: 1.4rem;
    font-weight: 600;
    transition: transform 180ms ease, background-color 180ms ease,
      border-color 180ms ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  &__primaryAction {
    color: var(--on-accent);
    background: var(--accent);

    &:hover {
      background: var(--accent-strong);
    }
  }

  &__secondaryAction {
    color: var(--text);
    border: 1px solid var(--line-strong);

    &:hover {
      border-color: var(--accent);
    }
  }

  &__textAction {
    display: inline-flex;
    padding: 1rem 0.6rem;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-muted);
    font-size: 1.4rem;

    &:hover {
      color: var(--accent);
    }
  }

  &__cvNote {
    color: var(--text-muted);
    font-size: 1.2rem;

    a {
      color: var(--text);
      text-decoration: underline;
      text-underline-offset: 0.3rem;

      &:hover {
        color: var(--accent);
      }
    }
  }

  &__scroll {
    position: absolute;
    bottom: 2.4rem;
    left: 50%;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    color: var(--text-muted);
    font-family: $mono-font-stack;
    font-size: 1rem;
    transform: translateX(-50%);

    @include breakpoint(md) {
      display: flex;
    }

    i {
      width: 1px;
      height: 3.6rem;
      background: linear-gradient(var(--accent), transparent);
    }
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
```

- [ ] **Step 3: Verificar**

`npx tsc --noEmit`: zero erros no projeto inteiro. Navegador, 1440 e 375, nos dois temas e idiomas: título "Hi, I'm Gustavo, a *front-end* developer" (PT: "Oi, eu sou o Gustavo, *desenvolvedor* front-end") com a palavra em laranja; botões funcionam (Ver projetos rola, Baixar CV baixa o arquivo certo por idioma); sem barra de rolagem horizontal em 375px.

- [ ] **Step 4: Commit**

```bash
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: centered hero in the new visual identity

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Cena 3D do hero (`HeroScene`)

**Files:**
- Create: `src/components/HeroScene/index.tsx`, `Scene.tsx`, `SceneBoundary.tsx`, `style.module.scss`
- Modify: `src/components/Header/index.tsx`

**Interfaces:**
- Consumes: `useMediaQuery`, `ThemeContext` (`theme`), fonte em `/fonts/helvetiker_bold.typeface.json`.
- Produces: `<HeroScene />` sem props. Renderiza `null` quando a tela é < 1024px, quando há `prefers-reduced-motion`, ou quando o WebGL falha.

- [ ] **Step 1: `SceneBoundary.tsx`**

```tsx
'use client'

import { Component, ReactNode } from 'react'

interface SceneBoundaryProps {
  children: ReactNode
}

class SceneBoundary extends Component<SceneBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default SceneBoundary
```

- [ ] **Step 2: `Scene.tsx`**

```tsx
'use client'

import { Float, Text3D } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { ReactNode, Suspense, useContext, useEffect, useRef } from 'react'
import { MathUtils } from 'three'
import type { Group } from 'three'

import { ThemeContext } from '@/contexts/ThemeContext'

const FONT_URL = '/fonts/helvetiker_bold.typeface.json'

const symbols = [
  { text: '{', position: [-4.6, 1.4, -1], size: 1.5, accent: false },
  { text: '}', position: [4.5, -1.3, -1.5], size: 1.4, accent: true },
  { text: '</>', position: [3.4, 2.1, -2], size: 0.9, accent: false },
  { text: '$', position: [-3.7, -1.9, -1], size: 1.1, accent: true },
  { text: ';', position: [-1.6, 2.6, -3], size: 0.9, accent: false },
] as const

function Rig({ children }: { children: ReactNode }) {
  const group = useRef<Group>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.current.x * 0.25,
      3,
      delta,
    )
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.current.y * 0.15,
      3,
      delta,
    )
  })

  return <group ref={group}>{children}</group>
}

interface SceneProps {
  active: boolean
  onFail: () => void
}

const Scene = ({ active, onFail }: SceneProps) => {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  const accent = isDark ? '#ff7a1a' : '#c2410c'
  const neutral = isDark ? '#34343a' : '#cfc8bd'

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      frameloop={active ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault()
          onFail()
        })
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color={accent} />

      <Suspense fallback={null}>
        <Rig>
          {symbols.map((symbol) => (
            <Float
              key={symbol.text}
              speed={1.2}
              rotationIntensity={0.6}
              floatIntensity={0.8}
            >
              <Text3D
                font={FONT_URL}
                position={[...symbol.position]}
                size={symbol.size}
                height={symbol.size * 0.35}
                curveSegments={8}
                bevelEnabled
                bevelSize={0.02}
                bevelThickness={0.03}
              >
                {symbol.text}
                <meshStandardMaterial
                  color={symbol.accent ? accent : neutral}
                  roughness={0.35}
                  metalness={0.4}
                />
              </Text3D>
            </Float>
          ))}
        </Rig>
      </Suspense>
    </Canvas>
  )
}

export default Scene
```

- [ ] **Step 3: `index.tsx` e estilo**

`src/components/HeroScene/index.tsx`:

```tsx
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import SceneBoundary from './SceneBoundary'
import styles from './style.module.scss'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

const HeroScene = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(true)
  const wrapper = useRef<HTMLDivElement>(null)
  const enabled = isDesktop && !reducedMotion && !failed

  useEffect(() => {
    const el = wrapper.current
    if (!enabled || !el) return
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={wrapper} className={styles.scene} aria-hidden="true">
      <SceneBoundary>
        <Scene active={inView} onFail={() => setFailed(true)} />
      </SceneBoundary>
    </div>
  )
}

export default HeroScene
```

`src/components/HeroScene/style.module.scss`:

```scss
.scene {
  position: absolute;
  z-index: -1;
  inset: 0;
  pointer-events: none;
}
```

- [ ] **Step 4: Encaixar no hero**

Em `src/components/Header/index.tsx`, adicionar `import HeroScene from '@/components/HeroScene'` e, logo depois do `<div className={styles.hero__glow} aria-hidden="true" />`, inserir `<HeroScene />`.

- [ ] **Step 5: Verificar (inclui os itens 1 e 2 do Review Focus)**

`npx tsc --noEmit` e `npm run lint` sem erros. No navegador:

1. 1440px, tema escuro: 5 símbolos 3D visíveis nas laterais e acima do texto, girando devagar; mover o mouse inclina a cena; o texto continua legível e clicável.
2. Tema claro: símbolos em tom claro com laranja `#c2410c`; contraste do texto do hero inalterado.
3. Redimensionar de 1440 para 900px: a cena some sem recarregar (`document.querySelector('canvas')` é `null`); voltar para 1440: reaparece.
4. Emular `prefers-reduced-motion: reduce` (DevTools > Rendering): sem `<canvas>`.
5. Rolar até o fim da página e voltar: sem queda de FPS perceptível; no console `document.querySelector('canvas')` existe só quando o hero está montado.
6. Simular falha de WebGL: no console rodar `document.querySelector('canvas').getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext()`. Expected: a cena some, o hero continua com o brilho CSS e sem erro vermelho de página.
7. Aba Network: o chunk do Three só carrega com a tela ≥ 1024px; em 375px não baixa `three` nem `helvetiker_bold.typeface.json`.

- [ ] **Step 6: Commit**

```bash
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: add lazy 3D hero scene with Three.js

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 9: `EditorPanel`, `SectionHeading` e as cinco seções

**Files:**
- Create: `src/components/EditorPanel/index.tsx`, `src/components/EditorPanel/style.module.scss`
- Modify: `src/components/SectionHeading/style.module.scss`, `src/components/About/index.tsx`, `src/components/Experience/index.tsx`, `src/components/Stack/index.tsx`, `src/components/Projects/index.tsx`, `src/components/Contacts/index.tsx`, e os `style.module.scss` de About, Experience, Stack, Projects, Contacts

**Interfaces:**
- Produces: `<EditorPanel filename: string; lines?: number; children: ReactNode />` (default `lines = 80`).
- Consumes: tokens da Task 1.

- [ ] **Step 1: `EditorPanel/index.tsx`**

```tsx
import { ReactNode } from 'react'

import styles from './style.module.scss'

interface EditorPanelProps {
  filename: string
  lines?: number
  children: ReactNode
}

const EditorPanel = ({ filename, lines = 80, children }: EditorPanelProps) => {
  return (
    <div className={styles.panel}>
      <div className={styles.panel__bar}>
        <span className={styles.panel__dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.panel__file}>{filename}</span>
      </div>

      <div className={styles.panel__body}>
        <span className={styles.panel__gutter} aria-hidden="true">
          {Array.from({ length: lines }, (_, index) => (
            <i key={index}>{index + 1}</i>
          ))}
        </span>
        <div className={styles.panel__content}>{children}</div>
      </div>
    </div>
  )
}

export default EditorPanel
```

- [ ] **Step 2: `EditorPanel/style.module.scss`**

```scss
@use 'abstracts' as *;

.panel {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;

  &__bar {
    display: flex;
    height: 3.6rem;
    padding-inline: 1.4rem;
    align-items: center;
    gap: 1.2rem;
    border-bottom: 1px solid var(--line);
    background: var(--bg-elevated);
  }

  &__dots {
    display: flex;
    gap: 0.5rem;

    i {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background: var(--line-strong);
    }
  }

  &__file {
    color: var(--syn-string);
    font-family: $mono-font-stack;
    font-size: 1.2rem;
  }

  &__body {
    position: relative;
    display: flex;
    overflow: hidden;
  }

  &__gutter {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: none;
    width: 4.8rem;
    padding-top: 2.4rem;
    flex-direction: column;
    align-items: flex-end;
    border-right: 1px solid var(--line);
    color: var(--text-muted);
    font-family: $mono-font-stack;
    font-size: 1.1rem;
    line-height: 2.4rem;
    opacity: 0.55;
    overflow: hidden;
    user-select: none;

    i {
      padding-right: 1rem;
      font-style: normal;
    }

    @include breakpoint(md) {
      display: flex;
    }
  }

  &__content {
    min-width: 0;
    flex: 1;
    padding: 2rem;

    @include breakpoint(md) {
      padding: 2.4rem 3rem 3rem 7.8rem;
    }
  }
}
```

- [ ] **Step 3: `SectionHeading`**

Substituir `src/components/SectionHeading/style.module.scss` inteiro:

```scss
@use 'abstracts' as *;

.heading {
  max-width: 78rem;
  margin-bottom: 4rem;

  &__eyebrow {
    display: flex;
    margin-bottom: 1.4rem;
    align-items: center;
    gap: 0.8rem;
    color: var(--text-muted);
    font-family: $mono-font-stack;
    font-size: 1.2rem;
    font-weight: 500;

    &::before {
      content: '//';
      color: var(--accent);
    }
  }

  &__title {
    max-width: 20ch;
    font-size: clamp(3.2rem, 6vw, 5.6rem);
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1.05;
    text-wrap: balance;
  }

  &__description {
    max-width: 64rem;
    margin-top: 2rem;
    color: var(--text-muted);
    font-size: 1.6rem;
    line-height: 1.7;
  }
}

.headingRight {
  margin-left: auto;
  text-align: right;

  .heading__eyebrow {
    justify-content: flex-end;
  }

  .heading__title,
  .heading__description {
    margin-left: auto;
  }
}
```

- [ ] **Step 4: Trocar valores fixos por tokens nos SCSS das seções**

Rodar na raiz do projeto (Git Bash):

```bash
cd src/components
sed -i "s/'Courier New', monospace/\$mono-font-stack/g" About/style.module.scss Experience/style.module.scss Stack/style.module.scss Projects/style.module.scss Contacts/style.module.scss
sed -i "s/#07110e/var(--on-accent)/g" Experience/style.module.scss Contacts/style.module.scss
sed -i -E "s/border-radius: (1\.1|1\.2|1\.4|1\.6|2)rem;/border-radius: var(--radius);/g" About/style.module.scss Experience/style.module.scss Stack/style.module.scss Projects/style.module.scss Contacts/style.module.scss
cd ../..
grep -rn "Courier\|#07110e\|#0b1018\|#ff6b6b\|#ffd166\|#8ef6d2\|#718096" src/components --include=*.scss
```
Expected do `grep`: só sobram `#0b1018`, `#ff6b6b`, `#ffd166`, `#8ef6d2`, `#718096` em `Projects/style.module.scss` (bloco `.preview`).

Em `Projects/style.module.scss`, bloco `.preview`:
- `background: #0b1018;` → `background: var(--bg-elevated);`
- `box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.32);` → `box-shadow: 0 1rem 3rem var(--shadow);`
- `border-bottom: 1px solid rgba(255, 255, 255, 0.08);` → `border-bottom: 1px solid var(--line);`
- as três bolinhas: `#ff6b6b` → `var(--line-strong)`, `#ffd166` → `var(--line-strong)`, `#8ef6d2` → `var(--accent)`
- `color: #718096;` → `color: var(--text-muted);`

Como os SCSS dessas seções usam `@use 'abstracts' as *;` (já presente em todos), `$mono-font-stack` resolve.

Também em `Projects/style.module.scss`: o `h3` do `.project__content` usa `font-weight: 780` e `letter-spacing: -0.055em`; trocar para `font-weight: 600; letter-spacing: -0.04em;`. Em `Contacts/style.module.scss`, no `h2` de `&__intro`: trocar `font-weight: 790; letter-spacing: -0.07em;` por `font-weight: 600; letter-spacing: -0.045em;`, e o `span` interno de contorno (`color: transparent; -webkit-text-stroke...`) por `color: var(--accent);` (remover `-webkit-text-stroke`).

- [ ] **Step 5: Envolver o conteúdo de cada seção em `EditorPanel`**

Adicionar `import EditorPanel from '@/components/EditorPanel'` em cada arquivo abaixo e fazer estas trocas:

**About** (`index.tsx`): envolver `<div className={styles.about__layout}> ... </div>` com `<EditorPanel filename="about.tsx"> ... </EditorPanel>` (o `SectionHeading` fica fora, acima).

**Experience** (`index.tsx`): envolver `<div className={styles.experience__timeline}> ... </div>` com `<EditorPanel filename="experience.ts" lines={120}> ... </EditorPanel>`.

**Stack** (`index.tsx`): envolver `<div className={styles.stack__grid}> ... </div>` com `<EditorPanel filename="stack.json" lines={60}> ... </EditorPanel>`.

**Projects** (`index.tsx`): envolver `<div className={styles.carouselWrapper}> ... </div>` com `<EditorPanel filename="projects.tsx" lines={60}> ... </EditorPanel>`; manter `<p className={styles.projects__note}>` fora.

**Contacts** (`index.tsx`): trocar `<div className={`${styles.contact__container} container`}> ... </div>` por:

```tsx
<div className="container">
  <EditorPanel filename="contact.ts" lines={60}>
    <div className={styles.contact__container}> ...conteúdo existente... </div>
  </EditorPanel>
</div>
```
(o `<section ... id="contact">` fica igual.)

Ajustes de scss para os painéis (no mesmo `style.module.scss` de cada seção):
- `About`, `Experience`, `Stack`: remover o `border-block`/`border-top` e o `background` do bloco raiz (`.about`, `.experience`, `.stack`), porque o painel já tem borda e fundo.
- `Experience`: em `&__marker`, trocar `border: 0.6rem solid var(--bg-elevated);` por `border: 0.6rem solid var(--surface);` e, no `@include breakpoint(md)` do mesmo bloco, manter `border-width: 1rem;`.
- Cards internos (`.about__card`, `.stack__card`, `.experience__card`, `.contact__link`) já usam `var(--surface)` com borda; no painel o fundo é o mesmo `var(--surface)`, então trocar `background: var(--surface);` por `background: var(--bg-elevated);` nesses quatro seletores para manter relevo.
- Cores de sintaxe: em `Experience`, `&__company { color: var(--syn-type); }`; em `Stack`, `&__header span { color: var(--syn-string); }`; em `About`, `&__cardTop span { color: var(--syn-string); }`.

- [ ] **Step 6: Verificar**

`npx tsc --noEmit` e `npm run lint` sem erros. No navegador, 1440 e 375, tema escuro e claro:
- Cada seção aparece dentro de um painel com barra de arquivo e numeração de linha (a numeração some abaixo de 768px).
- Texto e cards legíveis nos dois temas; nenhuma cor azul-ciano antiga (`#61dafb`) restante: `grep -rn "61dafb" src` retorna vazio.
- Carrossel de Projetos continua deslizando; botões com foco visível.
- Sem rolagem horizontal em 375px.

- [ ] **Step 7: Commit**

```bash
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: editor-style panels and refreshed sections

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Rolagem suave com Lenis

**Files:**
- Create: `src/components/SmoothScroll/index.tsx`
- Modify: `src/app/page.tsx`, `src/scss/base/_reset.scss`

**Interfaces:**
- Consumes: `useMediaQuery`, `setSmoothScroll`.
- Produces: instância do Lenis registrada em `smoothScroll.ts`; `scrollToHash` passa a usá-la.

- [ ] **Step 0: Confirmar o caminho do CSS do Lenis**

```bash
ls node_modules/lenis/dist/lenis.css
```
Expected: arquivo existe. Se não existir nesta versão, procure com `ls node_modules/lenis/dist` e ajuste o `import` do Step 1.

- [ ] **Step 1: `SmoothScroll/index.tsx`**

```tsx
'use client'

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { setSmoothScroll } from '@/utils/smoothScroll'

const SmoothScroll = () => {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({ lerp: 0.1 })
    setSmoothScroll(lenis)

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setSmoothScroll(null)
    }
  }, [reducedMotion])

  return null
}

export default SmoothScroll
```

- [ ] **Step 2: Montar e evitar conflito com `scroll-behavior`**

Em `src/app/page.tsx`: `import SmoothScroll from '@/components/SmoothScroll'` e inserir `<SmoothScroll />` logo depois de `<SkipLink />`.

Em `src/scss/base/_reset.scss`, o `html` já tem `scroll-behavior: smooth`. O `lenis.css` aplica `scroll-behavior: auto !important` em `html.lenis`, então nada a mudar aqui. Só confirme que o bloco `@media (prefers-reduced-motion: reduce)` continua fixando `scroll-behavior: auto`.

- [ ] **Step 3: Verificar**

No navegador (1440): a rolagem com roda do mouse fica suave; clicar nos ícones do trilho, nos botões do hero e no CTA da barra de status rola até a seção com o título visível (sem ficar sob a barra de título); botão voltar do navegador não quebra. Com `prefers-reduced-motion: reduce` emulado e página recarregada: rolagem nativa, âncoras ainda funcionam. Dentro da paleta (Task 11) a lista rolável deve rolar normalmente.

- [ ] **Step 4: Commit**

```bash
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: add Lenis smooth scrolling

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 11: `CommandPalette` no novo visual, com i18n e botão da barra de status

**Files:**
- Modify: `src/components/CommandPalette/index.tsx`, `src/components/CommandPalette/style.module.scss`

**Interfaces:**
- Consumes: `translations[lang].palette.*`, `OPEN_PALETTE_EVENT`, `scrollToHash`.
- Produces: paleta traduzida, aberta por Ctrl/Cmd+K **ou** pelo evento `open-command-palette`.

- [ ] **Step 1: Atualizar `index.tsx`**

1. Imports: adicionar `import { OPEN_PALETTE_EVENT } from '@/utils/events'`, `import { translations } from '@/utils/i18n'`, `import { scrollToHash } from '@/utils/smoothScroll'`; remover `ThemeContext`? Não: `setTheme` continua em uso. Manter.
2. Trocar o primeiro `useEffect` (atalho) por:

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }
  const handleOpen = () => setIsOpen(true)

  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener(OPEN_PALETTE_EVENT, handleOpen)
  return () => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener(OPEN_PALETTE_EVENT, handleOpen)
  }
}, [])
```

3. Logo depois de `const { language, setLanguage } = useContext(LanguageContext)`, adicionar `const copy = translations[language].palette`.
4. Substituir o array `commands` por:

```tsx
const goTo = (hash: string) => {
  scrollToHash(hash)
  setIsOpen(false)
}

const commands = [
  { id: 'theme-dark', label: copy.themeDark, action: () => { setTheme('dark'); setIsOpen(false) } },
  { id: 'theme-light', label: copy.themeLight, action: () => { setTheme('light'); setIsOpen(false) } },
  { id: 'lang-en', label: copy.langEn, action: () => { setLanguage('en'); setIsOpen(false) } },
  { id: 'lang-pt', label: copy.langPt, action: () => { setLanguage('pt'); setIsOpen(false) } },
  { id: 'nav-projects', label: copy.goProjects, action: () => goTo('#projects') },
  { id: 'nav-contact', label: copy.goContact, action: () => goTo('#contact') },
]
```

5. No JSX: `placeholder="Type a command or search..."` → `placeholder={copy.placeholder}`; `No commands found.` → `{copy.empty}`; no `<div className={styles.list}>` adicionar o atributo `data-lenis-prevent`; no `<input>` adicionar `aria-label={copy.placeholder}`; no `<motion.div className={styles.palette}>` adicionar `role="dialog" aria-modal="true" aria-label={copy.placeholder}`.

- [ ] **Step 2: Atualizar o estilo**

Em `style.module.scss`:
- `.overlay`: `background-color: rgba(0, 0, 0, 0.4);` → `background-color: color-mix(in srgb, var(--bg) 70%, transparent);`
- `.palette`: `border-radius: 12px;` → `border-radius: var(--radius);` e `box-shadow: 0 16px 64px rgba(0, 0, 0, 0.4);` → `box-shadow: 0 16px 64px var(--shadow);`
- `.input` e `.item`: adicionar `font-family: $mono-font-stack;`
- `.item:hover, .item:focus`: acrescentar `color: var(--accent);`
- `.item`: `border-radius: 6px;` → `border-radius: var(--radius);`

- [ ] **Step 3: Verificar**

`npx tsc --noEmit` e `npm run lint`. No navegador: Ctrl+K abre; clicar no botão `⌘ K` da barra de status abre; Esc fecha; os rótulos mudam entre EN e PT; "Ir para Projetos" rola até a seção; a paleta tem contraste legível nos dois temas.

- [ ] **Step 4: Commit**

```bash
git -c safe.directory=D:/Projetos/my-portfolio add -A
git -c safe.directory=D:/Projetos/my-portfolio commit -m "feat: restyle CommandPalette, translate it and open from StatusBar

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Verificação final

**Files:** nenhum (só correções pontuais, se algo falhar).

- [ ] **Step 1: Checagens automáticas**

```bash
node --test src/utils/localTime.test.mjs
npx tsc --noEmit
npm run lint
npm run build
```
Expected: 4 testes PASS; tsc, lint e build sem erro. Anotar o tamanho do "First Load JS" da rota `/` que o build imprime e conferir que o Three **não** está no bundle inicial (o tamanho não deve crescer mais que algumas dezenas de KB sobre a linha de base da Task 0).

- [ ] **Step 2: Percurso no navegador**

`npm run start` (porta 3000) e conferir, em 1440 e 375, nos dois temas e nos dois idiomas:

| Item | Esperado |
|---|---|
| Hero | Título centralizado, palavra em laranja, 3D só ≥ 1024px |
| Trilho | Ícone ativo acompanha a rolagem; clique rola até a seção |
| Barra de status | "Santo André, SP · … HH:MM" (horário de Brasília), sociais, CTA e Ctrl+K funcionam |
| Seções | Cinco painéis legíveis, sem sobras de cor ciano |
| Tema | Alternar não pisca; recarregar mantém o tema salvo |
| Idioma | PT e EN trocam hero, trilho, barra de status e paleta |
| Mobile | Sem rolagem horizontal; fim da página não fica sob as barras |
| Console | Sem erros nem avisos de hidratação |
| Reduced motion | Sem 3D, sem Lenis, âncoras funcionam |
| Teclado | Tab percorre SkipLink, barra de título, trilho, conteúdo, barra de status, com foco visível |

- [ ] **Step 3: Corrigir o que falhou e commitar**

Cada correção vira um commit pequeno (`fix: ...`). Quando tudo passar, informar ao usuário o resumo e os números do build.

- [ ] **Step 4: Revisão final independente**

Conforme a preferência do usuário (execução native): despachar um revisor independente, na ramificação inteira (`git diff main...feat/redesign`), com foco no Review Focus acima. Aplicar os achados Important e Critical antes de propor o merge.
