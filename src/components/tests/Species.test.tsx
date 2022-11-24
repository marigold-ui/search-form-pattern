import React from 'react';
import nock from 'nock';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Species, useSpecies } from '../Species';

nock('https://swapi.py4e.com').get('/api/species/1/').reply(
  200,
  {
    name: 'Droid',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('fetch species', async () => {
  const { result } = renderHook(() => useSpecies(1), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.species).toMatchInlineSnapshot(`
    {
      "name": "Droid",
    }
  `);
});

test('renders species name', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Species data-testid="1" id={1} />
    </QueryClientProvider>
  );

  await waitFor(() => expect(screen.getByText('Droid')).toBeInTheDocument());
});
