import React from 'react';
import nock from 'nock';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Starship, useStarships } from '../Starships';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

nock('https://swapi.py4e.com').get('/api/starships/1/').reply(
  200,
  {
    name: 'CR90 corvette',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('fetch starship', async () => {
  const { result } = renderHook(() => useStarships(1), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.starship).toMatchInlineSnapshot(`
    {
      "name": "CR90 corvette",
    }
  `);
});

test('renders starship name', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Starship data-testid="1" id={1} />
    </QueryClientProvider>
  );

  await waitFor(() =>
    expect(screen.getByText('CR90 corvette')).toBeInTheDocument()
  );
});
