import { sign } from '../src/sign';

describe('sign', () => {
  it('should produce different signatures for different payloads', () => {
    const secret_key_one =
      'adjfafakflksjddfasjfkljdflkjklj850820482fajsfl234224';
    const jwt_token_one = sign({
      payload: { name: 'arkar', age: 19 },
      secret: secret_key_one,
      options: { expireIn: 8.64e7 },
    }).split('.')[2];

    const secret_key_two =
      'adjfafakflksjddfasjfkljdflkjklj850820482fajsfl234224';
    const jwt_token_two = sign({
      payload: { name: 'min', age: 20 },
      secret: secret_key_two,
      options: { expireIn: 8.64e7 },
    }).split('.')[2];

    expect(jwt_token_one).not.toBe(jwt_token_two);
  });

  it('should add expired option time to the payload', () => {
    const secret_key_one =
      'adjfafakflksjddfasjfkljdflkjklj850820482fajsfl234224';
    const jwt_token_one = sign({
      payload: { name: 'arkar', age: 19 },
      secret: secret_key_one,
      options: { expireIn: 8.64e7 },
    }).split('.')[1];

    expect(typeof JSON.parse(atob(jwt_token_one)).exp).toBe('number');
  });
});
