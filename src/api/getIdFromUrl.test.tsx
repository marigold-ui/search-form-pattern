import React from 'react';
import nock from 'nock';
import { screen, waitFor, render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Film } from '~/components';
import { getIdFromUrl } from './getIdFromUrl';

nock('https://swapi.py4e.com').get('/api/films/1/').reply(
  200,
  {
    title: 'A new Hope',
    url: 'https://swapi.py4e.com/api/films/1/',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

const queryClient = new QueryClient();

test('get id from url works', async () => {
  const url = 'https://swapi.py4e.com/api/films/1/';
  render(
    <QueryClientProvider client={queryClient}>
      <Film id={getIdFromUrl(url)} />
    </QueryClientProvider>
  );

  await waitFor(() =>
    expect(screen.getByText('A new Hope')).toBeInTheDocument()
  );
});

test('throws error if not matched url', async () => {
  const url = 'https://swapi.py4e.com/api/films/';

  expect(() => {
    getIdFromUrl(url);
  }).toThrow('No match');
});
