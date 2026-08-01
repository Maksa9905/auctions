import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';
import { useState } from 'react';

import { createQueryClient } from '@app/query-client';
import { router } from '@app/router';

import { Toaster } from '@/shared/ui/sonner';

import '@app/index.css';

function App() {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <div className="mx-auto min-h-svh w-full max-w-6xl px-6 py-6">
          <RouterProvider router={router} />
        </div>
        <Toaster position="top-right" richColors closeButton />
      </NuqsAdapter>
    </QueryClientProvider>
  );
}

export default App;
