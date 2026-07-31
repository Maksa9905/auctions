import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { useState } from 'react';

import { createQueryClient } from '@app/query-client';
import { router } from '@app/router';

import '@app/index.css';

function App() {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto min-h-svh w-full max-w-6xl px-6 py-6">
        <RouterProvider router={router} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
