import '@app/i18n';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@app/App.tsx';

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MSW !== 'true') {
    return;
  }

  const { startMockWorker } = await import('@shared/api/msw/browser');
  await startMockWorker();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
