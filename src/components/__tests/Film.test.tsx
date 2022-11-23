import React from 'react';
import nock from 'nock';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Film, useFilm } from '../Film';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

nock('https://swapi.py4e.com').get('/api/films/1/').reply(
  200,
  {
    title: 'Some random Star Wars Film',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('fetch film', async () => {
  const { result } = renderHook(() => useFilm(1), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.film).toMatchInlineSnapshot(`
    {
      "title": "Some random Star Wars Film",
    }
  `);
});

test('renders film title', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Film data-testid="1" id={1} />
    </QueryClientProvider>
  );

  await waitFor(() =>
    expect(screen.getByText('Some random Star Wars Film')).toBeInTheDocument()
  );
});
