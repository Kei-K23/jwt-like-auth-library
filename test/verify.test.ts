import { sign, verify } from '../src';

describe('verify', () => {
  it('should verify and decode a valid toke', () => {
    const secret = 'alsdjal223424sdfjal234234';
    const token = sign({
      payload: { name: 'arkarmin', age: 19 },
      secret,
      options: { expireIn: 424294242 },
    });
    const verified = verify({
      token,
      secret,
    });
    expect(verified.name).toBe('arkarmin');
  });
  it('should produce invalid toke', () => {
    const secret1 = 'alsdjal223424sdfjal234234';
    const secret2 = 'alsdjal223424sdfjal234234sjdflka979sdfj';
    const token = sign({
      payload: { name: 'arkarmin', age: 19 },
      secret: secret1,
      options: { expireIn: 424294242 },
    });
    try {
      verify({
        token,
        secret: secret2,
      });
    } catch (e) {
      expect(e.message).toBe('Invalid signature');
    }
  });
  it('should produce expired time', () => {
    const secret1 = 'alsdjal223424sdfjal234234';
    const token = sign({
      payload: { name: 'arkarmin', age: 19 },
      secret: secret1,
      options: { expireIn: -424294242 },
    });
    try {
      verify({
        token,
        secret: secret1,
      });
    } catch (e) {
      expect(e.message).toBe('Token expired');
    }
  });
});
