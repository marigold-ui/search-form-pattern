import React from 'react';
import nock from 'nock';
import { screen, render } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';

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

// helper component to show that the search is set
export const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.search}</div>;
};

test('url is set correctly if search is luke', () => {
  render(
    <MemoryRouter initialEntries={[`?search=luke`]}>
      <LocationDisplay />
    </MemoryRouter>
  );
  expect(screen.getByTestId('location-display')).toHaveTextContent(
    '?search=luke'
  );
});

test('url is set correctly if search is not set', () => {
  render(
    <MemoryRouter initialEntries={[`?search=`]}>
      <LocationDisplay />
    </MemoryRouter>
  );
  expect(screen.getByTestId('location-display')).toHaveTextContent('?search=');
});
