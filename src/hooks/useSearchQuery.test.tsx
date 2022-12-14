import React from 'react';
import nock from 'nock';
import { screen, render, renderHook } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { useSearchParam } from './useSearchQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

nock('https://swapi.py4e.com')
  .get('/api/people/')
  .query(query => 'search' in query)
  .reply(
    200,
    uri => {
      const url = new URL(`https://swapi.py4e.com/${uri}`);
      const search = url.searchParams.get('search');

      switch (search) {
        case '':
          return [];
        case 'luke':
          return {
            name: 'Luke',
            homeworld: 'http://example.com/1/',
            url: 'http://example.com/1/',
          };
        default:
          throw Error(`Using "${search}" as search is not mocked!`);
      }
    },
    { 'Access-Control-Allow-Origin': '*' }
  );

const queryClient = new QueryClient();
const createWrapper =
  (query = '') =>
  ({ children }) =>
    (
      <MemoryRouter initialEntries={[`?search=${query}`]}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MemoryRouter>
    );

// helper component to show that the search is set
export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.search}</div>;
};

test('url is set correctly if search is luke', () => {
  const { result } = renderHook(() => useSearchParam(), {
    wrapper: createWrapper('luke'),
  });

  // the hook returns the searched query
  expect(result.current[0]).toBe('luke');

  // the url is correctly displayed
  render(<LocationDisplay />, { wrapper: createWrapper('luke') });
  expect(screen.getByTestId('location-display')).toMatchInlineSnapshot(`
    <div
      data-testid="location-display"
    >
      ?search=luke
    </div>
  `);
});

test('url is set correctly if search is not set', () => {
  const { result } = renderHook(() => useSearchParam(), {
    wrapper: createWrapper(''),
  });

  // the hook returns the searched query
  expect(result.current[0]).toBe('');

  // the url is correctly displayed
  render(<LocationDisplay />, { wrapper: createWrapper('') });
  expect(screen.getByTestId('location-display')).toMatchInlineSnapshot(`
    <div
      data-testid="location-display"
    >
      ?search=
    </div>
  `);
});
