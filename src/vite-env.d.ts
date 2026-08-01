/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_ENABLE_MSW?: string;
  /** Задержка MSW-ответов в мс (для проверки skeleton) */
  readonly VITE_MSW_DELAY_MS?: string;
  /** Вероятность ошибки MSW от 0 до 1 (для проверки error state) */
  readonly VITE_MSW_ERROR_RATE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
