# Redesign do portfólio — design

Data: 2026-11-14

## Objetivo

Redesenhar o portfólio de Gustavo Lima (Next.js 13, SCSS modules, Framer Motion) inspirado no layout do
portfólio de Stefano Bartoletti (Behance, design de Lorenzo Bocchi): visual de IDE, hero centralizado com
objetos 3D, trilho lateral, barra de status. É inspiração de layout, não cópia de assets ou textos.

## Decisões acordadas

- Escopo: redesign completo (hero, navegação, rodapé e todas as seções).
- Acento: laranja `#FF7A1A` (variação mais clara para hover).
- Hero 3D: Three.js leve, só no cliente e só em telas grandes.
- Temas: **escuro e claro**, com alternância (mantém `ThemeContext` e `ThemeSwitcher`).
- Local na barra de status: "Santo André, SP", com horário local real.
- Mantém: i18n PT/EN, CV em `.docx`, dados em `src/utils/*Data.ts`, `CommandPalette`, `SkipLink`.

## Identidade visual

Tokens como variáveis CSS em `:root` (claro) e `html.dark` (escuro), consumidos pelos SCSS modules.

| Token | Escuro | Claro |
|---|---|---|
| `--bg` | `#0b0b0c` | `#f6f4f1` |
| `--surface` | `#141416` | `#ffffff` |
| `--border` | `#26262a` | `#e2ddd6` |
| `--text` | `#ededed` | `#1a1a1a` |
| `--muted` | `#8b8b93` | `#6b655d` |
| `--accent` | `#ff7a1a` | `#d85a00` (contraste AA sobre claro) |

- Fonte mono (JetBrains Mono via `next/font`) para rótulos, barras e código; Inter para texto corrido.
- Brilho laranja difuso no fundo do hero e grão sutil; no claro, o brilho é mais suave.

## Moldura estilo IDE (global)

- **Barra de título** (topo): `gustavo <lima>` centralizado; seletor PT/EN e alternador de tema à direita.
- **Trilho lateral** (esquerda): ícones início, sobre, experiência, projetos, contato; rola até a seção e
  marca a ativa (IntersectionObserver). Em telas < 768px vira barra inferior.
- **Barra de status** (rodapé fixo): "Based in Santo André, SP · Local time HH:MM", links (LinkedIn, GitHub,
  e-mail), botão `let's-work-together` para `#contact` e atalho do `CommandPalette` (Ctrl+K).
  O horário usa `Intl.DateTimeFormat` com `America/Sao_Paulo`, atualizado a cada minuto no cliente.

Componentes novos: `TitleBar`, `SideRail`, `StatusBar`. `Navbar` e `Footer` atuais são substituídos.

## Hero

- Centralizado: "Hi, I'm Gustavo, a *front-end* developer", palavra-chave em laranja (texto vem do i18n).
- Descrição curta, botões Ver projetos / Baixar CV, indicador de disponibilidade.
- Cena 3D (`HeroScene`): 4 a 5 símbolos (`{ }`, `</>`, `$`, `›`) em Three.js via `@react-three/fiber` e
  `drei` (`Text3D`), rotação lenta e parallax leve com o mouse.
  - Carregada com `next/dynamic` (`ssr: false`).
  - Só monta se `min-width: 1024px` e sem `prefers-reduced-motion`; caso contrário, fica só o brilho CSS.
  - Pausa o render quando a aba está oculta ou o hero fora da tela.
- Remove o terminal falso e o orbit atuais.

## Seções

Sobre, Experiência, Projetos, Stack e Contato viram painéis de editor: cabeçalho com nome de arquivo
(`about.tsx`), numeração de linha, destaque de sintaxe (laranja, azul, verde-suave). Cards de projeto com
borda fina e hover com brilho laranja. Rolagem suave com Lenis, desligada em `prefers-reduced-motion`.
`SectionHeading` é adaptado ao novo estilo.

## Acessibilidade e desempenho

Mantém `SkipLink`, foco visível e contraste AA nos dois temas. Troca o `CustomCursor` por versão discreta
ou o remove se atrapalhar (decidir na implementação, com teste manual). Three.js fica fora do bundle inicial.

## Dependências novas

`three`, `@react-three/fiber`, `@react-three/drei`, `lenis`, mais `@types/three`.
Compatibilidade com React 18.2 e Next 13.4: usar versões de `fiber`/`drei` compatíveis com React 18.

## Verificação

`next build` e `next lint` sem erros; navegador embutido em desktop (1440) e celular (375), nos dois temas
e nos dois idiomas; conferir que o 3D não monta em tela pequena nem com reduced-motion.

## Fora de escopo

Mudar conteúdo dos projetos, textos do currículo, hospedagem ou domínio.
