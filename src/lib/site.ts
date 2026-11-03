/** Profile links shown in the hero and footer. Edit here only. */
export const SOCIAL = [
  { label: 'GitHub', href: 'https://github.com/ctorres345', logo: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cesartorresjh/', logo: null },
] as const;

/**
 * Comments with giscus (GitHub Discussions). They show up on entry pages once
 * `categoryId` is filled in. Get it at https://giscus.app after turning on
 * Discussions in the repo and installing the giscus app.
 */
export const GISCUS = {
  repo: 'ctorres345/Anamnesis',
  repoId: 'R_kgDOVgasPQ',
  category: 'Comments',
  categoryId: '',
} as const;
