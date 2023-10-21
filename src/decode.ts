export function decode<T>(token: string): T {
  const segment = token.split('.');
  if (segment.length !== 3) throw new Error('Invalid JWT token');

  const payload = segment[1];

  return JSON.parse(atob(payload)) as T;
}
