import { sign, decode } from '../src';

describe('decode', () => {
  it('should decode the token payload', () => {
    const payload = {
      name: 'arkarmin',
      age: 19,
    };
    const secret = '24aslf24jajfla242sjfkjasf2424snjahtaowfjfgna27424';
    const toke = sign({
      payload,
      secret,
      options: {
        expireIn: 533233232,
      },
    });

    const decoded = decode<{ name: string; age: number }>(toke);
    expect(decoded.name).toBe('arkarmin');
  });
});
