import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Jonathan',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Jonathan&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Jonathan',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Jonathan&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Jonathan',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => queryString(obj)).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Jonathan&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Jonathan',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value is passed', () => {
    const qs = 'name=Jonathan';

    expect(parse(qs)).toEqual({
      name: 'Jonathan',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Jonathan&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Jonathan',
      abilities: ['JS', 'TDD'],
    });
  });
});
