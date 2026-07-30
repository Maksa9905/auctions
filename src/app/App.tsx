import { Container, Theme } from '@radix-ui/themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { useState } from 'react';

import { createQueryClient } from '@app/query-client';
import { router } from '@app/router';

import '@radix-ui/themes/styles.css';

function App() {
  const [queryClient] = useState(createQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        appearance="light"
        accentColor="tomato"
        grayColor="mauve"
        radius="large"
        scaling="100%"
        panelBackground="solid"
        hasBackground
      >
        <Container size="4" py="6" px="6">
          <RouterProvider router={router} />
        </Container>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
