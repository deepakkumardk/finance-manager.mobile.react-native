import {describe, it, expect} from '@jest/globals';

import {StringUtils} from 'src/module/StringUtils';

describe('StringUtils', () => {
  describe('splitStringByQuery', () => {
    const message =
      'My name is Hello World & I live in a world of colors, and the name is rainbow with 7 colors';
    const testCases = [
      [
        'name',
        [
          'My ',
          'name',
          ' is Hello World & I live in a world of colors, and the ',
          'name',
          ' is rainbow with 7 colors',
        ],
      ],
    ];
    it.each(testCases)(
      'For each %s it should return %s',
      // @ts-ignore
      (input: string, expected: string[]) => {
        const result = StringUtils.splitStringByQuery(message, input);
        expect(result).toEqual(expect.arrayContaining(expected));
      },
    );
  });
});
