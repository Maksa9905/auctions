import { describe, expect, it } from 'vitest';

import { chunkByColumns } from './chunkByColumns';

describe('chunkByColumns', () => {
  it('разбивает массив на строки по columns', () => {
    expect(chunkByColumns([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('возвращает пустой массив для пустого входа', () => {
    expect(chunkByColumns([], 3)).toEqual([]);
  });
});
