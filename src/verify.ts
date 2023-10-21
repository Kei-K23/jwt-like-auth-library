import { decode } from './decode';
import { createSignature } from './sign';

export interface VerifyProp {
  token: string;
  secret: string;
}

function dateInPast(exp: number) {
  const currentTime = new Date();
  return new Date(exp).setHours(0, 0, 0, 0) <= currentTime.setHours(0, 0, 0, 0);
}

export function verify({
  token,
  secret,
}: VerifyProp): { name: string; age: number; exp: number } {
  const segment = token.split('.');

  if (segment.length !== 3) throw new Error('Invalid jwt token');

  const [encodedHeader, encodedPayload, signature] = segment;

  const candidateSignature = createSignature({
    encodedHeader,
    encodedPayload,
    signature: secret,
  });

  if (signature !== candidateSignature) throw new Error('Invalid signature');

  const decoded = decode<{ name: string; age: number; exp: number }>(token);
  const { exp } = decoded;
  if (dateInPast(exp)) throw new Error('Token expired');

  return decoded;
}
