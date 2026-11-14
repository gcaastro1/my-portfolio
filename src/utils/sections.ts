export const sectionIds = [
  'home',
  'about',
  'experience',
  'projects',
  'stack',
  'contact',
] as const

export type SectionId = (typeof sectionIds)[number]
