import React from 'react';
import nock from 'nock';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Homeworld, useHomeworld } from '../Homeworld';

nock('https://swapi.py4e.com').get('/api/planets/1/').reply(
  200,
  {
    name: 'Some random Star Wars Planet',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('fetch homeworld', async () => {
  const { result } = renderHook(() => useHomeworld(1), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.homeworld).toMatchInlineSnapshot(`
    {
      "name": "Some random Star Wars Planet",
    }
  `);
});

test('renders homeworld name', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Homeworld data-testid="1" id={1} />
    </QueryClientProvider>
  );

  await waitFor(() =>
    expect(screen.getByText('Some random Star Wars Planet')).toBeInTheDocument()
  );
});
