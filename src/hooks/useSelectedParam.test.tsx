import React from 'react';
import nock from 'nock';
import { screen, render, renderHook } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSelectedParam } from './useSelectedParam';

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
          };
        default:
          throw Error(`Using "${search}" as search is not mocked!`);
      }
    },
    { 'Access-Control-Allow-Origin': '*' }
  );

const queryClient = new QueryClient();
const createWrapper =
  (query = '', selected = '') =>
  ({ children }) =>
    (
      <MemoryRouter initialEntries={[`?search=${query}&selected=${selected}`]}>
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

test('test if url has search and selected item', async () => {
  const { result } = renderHook(() => useSelectedParam(), {
    wrapper: createWrapper('luke', '1'),
  });

  // the hook returns the selected id
  expect(result.current[0]).toBe('1');

  // the url is correctly displayed
  render(<LocationDisplay />, { wrapper: createWrapper('luke', '1') });
  expect(screen.getByTestId('location-display')).toMatchInlineSnapshot(`
    <div
      data-testid="location-display"
    >
      ?search=luke&selected=1
    </div>
  `);
});
