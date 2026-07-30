import { defineConfig } from 'orval';

export default defineConfig({
  auctions: {
    input: {
      target: './src/openapi.auctions.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/shared/api/generated',
      schemas: './src/shared/api/generated/model',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      formatter: 'prettier',
      override: {
        mutator: {
          path: './src/shared/api/http.ts',
          name: 'apiFetch',
        },
        fetch: {
          includeHttpResponseReturnType: false,
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
});
