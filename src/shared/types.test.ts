import { describe, expect, it } from 'vitest';

import { Language } from './types';

describe('Language', () => {
  it('содержит поддерживаемые языки', () => {
    expect(Language.ru).toBe('ru');
    expect(Language.en).toBe('en');
  });
});
