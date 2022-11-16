import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

export interface SwapiProviderProps {
  children: ReactNode;
}

export const SwapiProvider = ({ children }: SwapiProviderProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
