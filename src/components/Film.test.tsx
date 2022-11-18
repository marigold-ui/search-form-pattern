import React from 'react';
import nock from 'nock';
import {
  prettyDOM,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import { Film, useFilm } from './Film';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { getIdFromUrl } from '~/api/getIdFromUrl';

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

// render film

// render film title

// Navigation renders

// Navigation can switch theme

// Search renders

// Search searches by enter

// Search finds nothing + error

// Search finds character

// shows ResultList

// Detail Button works + get data

// loading state is rendered

// renders Homeworld

// renders name of planet, finds it

// renders character

// renders detailCard

// has informations (name, birthyear etc.)

// spaceships, vehicles, species
