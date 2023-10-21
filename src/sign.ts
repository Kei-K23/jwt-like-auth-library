import crypto from 'crypto';

interface Options {
  expireIn?: number;
}

export interface SignProp {
  payload: object;
  secret: string;
  options?: Options;
}

export interface CreateSignatureProp {
  secret: string;
  encodedHeader: string;
  encodedPayload: string;
}

const defaultOptions = {
  expireIn: 8.64e7,
};

function base64Encoded(obj: object): string {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

function createSignature({
  secret,
  encodedHeader,
  encodedPayload,
}: CreateSignatureProp) {
  return crypto
    .createHmac('sha256', secret)
    .update(encodedHeader + '.' + encodedPayload)
    .digest('base64');
}

export function sign({ payload, secret, options = {} }: SignProp) {
  // merger options
  const mergeOptions = { ...defaultOptions, ...options };
  // token header
  const header = { alg: 'HS256', type: 'jwt' };
  const encoded_header = base64Encoded(header);
  // expire from sign in time
  const date = Date.now();
  const expireIn = date + mergeOptions.expireIn;
  // token payload
  const encoded_payload = base64Encoded({ ...payload, exp: expireIn });
  const signature = createSignature({
    secret,
    encodedHeader: encoded_header,
    encodedPayload: encoded_payload,
  });

  return `${encoded_header}.${encoded_payload}.${signature}`;
}
