# Gustavo Lima — Interactive Portfolio

A modern, responsive portfolio for Gustavo Lima, a Front-End Developer focused
on React.js, Next.js, and TypeScript. The experience features a minimalist solid 
design, strong typography, "Dev-First" interactivity (like a Command Palette), 
and code-inspired UI to present professional experience, technical skills, and 
selected projects.

## Preview

- [Live portfolio](https://gustavolima.vercel.app)
- [LinkedIn](https://www.linkedin.com/in/gucaastro1/)
- [GitHub](https://github.com/gcaastro1)

## Tech stack

- Next.js 13
- React 18
- TypeScript
- Sass / SCSS Modules
- Framer Motion
- Phosphor Icons
- Vercel
- Node.js 24

## Features

- **Command Palette:** Quick navigation and theme/language switching via `Cmd/Ctrl + K`.
- **Custom Cursor:** Magnetic hover interactions replacing the native OS pointer.
- **Native Smooth Scrolling:** Fluid section navigation with active sliding indicators.
- **Internationalization (i18n):** Complete English and Portuguese localization.
- Interactive hero with an animated developer terminal
- Professional About section with visual focus cards
- Responsive experience timeline
- Curated local project data with a simulated product preview
- Technologies grouped by area of expertise
- Direct contact links for email, LinkedIn, GitHub and WhatsApp
- Downloadable English and Portuguese résumés
- Persistent light and dark themes
- Animated mobile navigation
- Responsive, keyboard-friendly interface with reduced-motion support
- SEO metadata for front-end opportunities

## Running locally

Requirements:

- Node.js 24.x
- npm

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run lint
npm run build
npm start
```

## Project structure

```text
src/
├── app/                 # Next.js App Router entry points
├── components/
│   ├── About/
│   ├── CommandPalette/
│   ├── Contacts/
│   ├── CustomCursor/
│   ├── Experience/
│   ├── Footer/
│   ├── Header/
│   ├── Navbar/
│   ├── Projects/
│   ├── SectionHeading/
│   └── Stack/
├── contexts/            # Light/dark theme & language state
├── scss/                # Global tokens and reset
└── utils/               # Projects, experience, stack and contact data
```

## Content management

Portfolio content is kept separate from presentation:

- `src/utils/projectsData.ts`
- `src/utils/experienceData.ts`
- `src/utils/stackData.ts`
- `src/utils/contactsData.ts`

Future projects can be prepared with `visible: false` and published when ready.

## Next improvements

- Replace DOCX résumés with polished PDF versions
- Publish FinanceFlow, Stockly ERP and HelpDesk Pro case studies
- Add an integrated Blog / Articles section
- Add automated accessibility and end-to-end tests
- Add a social sharing image for Open Graph

## Contact

- Email: [gcaastro1@gmail.com](mailto:gcaastro1@gmail.com)
- LinkedIn: [linkedin.com/in/gucaastro1](https://www.linkedin.com/in/gucaastro1/)
- GitHub: [github.com/gcaastro1](https://github.com/gcaastro1)
