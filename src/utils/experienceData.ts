export interface ExperienceData {
  company: string
  role: string
  period: string
  highlights: string[]
}

const experienceData: ExperienceData[] = [
  {
    company: 'SBOnline Sistemas',
    role: 'Front-End Developer / Software Engineer',
    period: 'Jan 2025 – Present',
    highlights: [
      'Maintained and modernized business-critical ERP systems.',
      'Improved screens, filters, reports and business workflows used by real users.',
      'Worked with Delphi/VCL, SQL and front-end technologies to improve stability, usability and performance.',
    ],
  },
  {
    company: 'NOVE HUB',
    role: 'Front-End Developer',
    period: 'Jan 2024 – Nov 2024',
    highlights: [
      'Built and maintained landing pages and web applications using React.js and Firebase.',
      'Translated Figma interfaces into responsive, reusable and maintainable front-end components.',
      'Integrated modern front-end interfaces with no-code platforms such as Bubble.io and WordPress.',
    ],
  },
  {
    company: 'Kenzie Academy Brasil',
    role: 'Technical Teaching Assistant',
    period: 'Sep 2022 – Apr 2024',
    highlights: [
      'Reviewed code and supported students in React, TypeScript, Python and web development.',
      'Provided technical feedback to improve code quality, architecture and problem-solving skills.',
    ],
  },
  {
    company: 'Invillia',
    role: 'UX/UI Designer',
    period: 'May 2019 – Oct 2019',
    highlights: [
      'Created user flows, wireframes and high-fidelity prototypes.',
      'Worked with Figma, Adobe XD and Illustrator to support product discovery and interface design.',
    ],
  },
]

export default experienceData
