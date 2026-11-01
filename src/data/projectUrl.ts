export const projectUrl = (title: string): string =>
  `/projects/${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}/`;
