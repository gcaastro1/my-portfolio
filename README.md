# Gustavo Lima — Interactive Portfolio

A modern, responsive portfolio for Gustavo Lima, a Front-End Developer focused
on React.js, Next.js and TypeScript. The experience combines strong typography,
subtle motion and code-inspired UI to present professional experience, technical
skills and selected projects to recruiters and product teams.

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
│   ├── Contacts/
│   ├── Experience/
│   ├── Footer/
│   ├── Header/
│   ├── Navbar/
│   ├── Projects/
│   ├── SectionHeading/
│   └── Stack/
├── contexts/            # Light/dark theme state
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

- Add complete English/Portuguese localization
- Replace DOCX résumés with polished PDF versions
- Publish FinanceFlow, Stockly ERP and HelpDesk Pro case studies
- Add automated accessibility and end-to-end tests
- Add a social sharing image for Open Graph

## Contact

- Email: [gcaastro1@gmail.com](mailto:gcaastro1@gmail.com)
- LinkedIn: [linkedin.com/in/gucaastro1](https://www.linkedin.com/in/gucaastro1/)
- GitHub: [github.com/gcaastro1](https://github.com/gcaastro1)
