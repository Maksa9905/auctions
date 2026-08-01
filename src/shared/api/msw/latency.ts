import { delay, HttpResponse } from 'msw';

function readNumberEnv(name: keyof ImportMetaEnv, fallback = 0) {
  const raw = import.meta.env[name];
  if (raw == null || raw === '') {
    return fallback;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Имитация сети: `VITE_MSW_DELAY_MS` (мс), по умолчанию 0 */
export async function applyMswLatency() {
  const delayMs = Math.max(0, readNumberEnv('VITE_MSW_DELAY_MS'));
  if (delayMs > 0) {
    await delay(delayMs);
  }
}

/**
 * Случайная ошибка: `VITE_MSW_ERROR_RATE` от 0 до 1 (например 0.3 = 30%).
 * Возвращает Response или `null`, если ошибку не нужно отдавать.
 */
export function maybeMswError() {
  const rate = Math.min(1, Math.max(0, readNumberEnv('VITE_MSW_ERROR_RATE')));
  if (rate <= 0 || Math.random() >= rate) {
    return null;
  }

  return HttpResponse.json(
    {
      type: 'https://httpstatuses.com/503',
      title: 'Service Unavailable',
      status: 503,
      detail: 'MSW simulated error',
    },
    { status: 503 },
  );
}
