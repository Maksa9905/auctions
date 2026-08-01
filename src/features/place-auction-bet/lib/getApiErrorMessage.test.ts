import { describe, expect, it } from 'vitest';

import { getApiErrorMessage, isValidationApiError } from './getApiErrorMessage';

describe('getApiErrorMessage', () => {
  it('берёт detail', () => {
    expect(getApiErrorMessage({ info: { detail: 'Закрыто' } }, 'fallback')).toBe('Закрыто');
  });

  it('берёт первое field error', () => {
    expect(
      getApiErrorMessage(
        { info: { errors: [{ field: 'price', message: 'Bad step' }] } },
        'fallback',
      ),
    ).toBe('Bad step');
  });

  it('берёт title, затем Error.message, затем fallback', () => {
    expect(getApiErrorMessage({ info: { title: 'Validation Failed' } }, 'fallback')).toBe(
      'Validation Failed',
    );
    expect(getApiErrorMessage(new Error('network'), 'fallback')).toBe('network');
    expect(getApiErrorMessage({}, 'fallback')).toBe('fallback');
  });
});

describe('isValidationApiError', () => {
  it('true только для 422', () => {
    expect(isValidationApiError({ status: 422 })).toBe(true);
    expect(isValidationApiError({ status: 500 })).toBe(false);
    expect(isValidationApiError(null)).toBe(false);
  });
});
