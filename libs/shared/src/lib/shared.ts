export function shared(): string {
  return 'shared';
}

export function buildGoogleSearch(search: string): string {
  const googleUrl = 'https://www.google.com/search?q=';
  const searchTerm = search.split(' ').join('+');
  return `${googleUrl}${searchTerm}`;
}
