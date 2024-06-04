export function normalizeCase(str: string) {
  return str.split('_').join(' ').toLowerCase();
}

export function uppercaseFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function normalizeEnum(str: string) {
  return uppercaseFirst(normalizeCase(str));
}
