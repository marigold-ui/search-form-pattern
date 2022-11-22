import React from 'react';
import nock from 'nock';
import { screen, waitFor, render, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Film, useFilm } from '~/components';
import { getIdFromUrl } from './getIdFromUrl';
import { getJson } from './getJson';

nock('https://swapi.py4e.com').get('/api/films/1/').reply(
  200,
  {
    title: 'A new Hope',
    url: 'https://swapi.py4e.com/api/films/1/',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('get json error', async () => {
  const url = 'https://swapi.py4e.com/api/films';

  try {
    expect.assertions(1);
    return expect(async () => {
      await getJson(url);
    }).rejects.toThrow();
  } catch (e) {
    expect(e).toEqual('Error: Network request failed');
  }
});
