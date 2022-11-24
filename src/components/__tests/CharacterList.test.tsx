import React from 'react';
import nock from 'nock';
import {
  renderHook,
  screen,
  waitFor,
  render,
  fireEvent,
} from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CharacterList, useCharacterList } from '../CharacterList';
import { MemoryRouter } from 'react-router-dom';
import { DetailCard } from '../DetailCard';

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
        case 'lu':
          return {
            results: [
              {
                name: 'Luke',
                homeworld: 'http://example.com/1/',
                url: 'http://example.com/1/',
                birth_year: '19BBY',
              },
              {
                name: 'Luminara',
                homeworld: 'http://example.com/1/',
                url: 'http://example.com/2/',
              },
            ],
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

test('fetch characterlist', async () => {
  const { result } = renderHook(() => useCharacterList(), {
    wrapper: createWrapper('lu'),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
  expect(result.current.characters).toMatchInlineSnapshot(`
    [
      {
        "birth_year": "19BBY",
        "homeworld": "http://example.com/1/",
        "name": "Luke",
        "url": "http://example.com/1/",
      },
      {
        "homeworld": "http://example.com/1/",
        "name": "Luminara",
        "url": "http://example.com/2/",
      },
    ]
  `);
});

test('error if no character is found', async () => {
  const { result } = renderHook(() => useCharacterList(), {
    wrapper: createWrapper(''),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(false);
  });
  expect(result.current.characters).toMatchInlineSnapshot(`[]`);
});

test('renders character list', async () => {
  const { result } = renderHook(() => useCharacterList(), {
    wrapper: createWrapper('lu'),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  render(<CharacterList />, { wrapper: createWrapper('lu') });

  const table = screen.getByRole('grid');
  expect(table).toBeInTheDocument();
  expect(screen.getByText('Luke')).toBeInTheDocument();
  expect(screen.getByText('Luminara')).toBeInTheDocument();
  expect(screen.getAllByRole('button'));
});

test('clicks on button and opens detail card', async () => {
  const { result } = renderHook(() => useCharacterList(), {
    wrapper: createWrapper('lu'),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });
  render(<CharacterList />, { wrapper: createWrapper('lu') });
  const buttons = screen.getAllByRole('button');
  expect(buttons);

  buttons.forEach(element => {
    fireEvent.click(element);
    render(<DetailCard data-testid="1" />, { wrapper: createWrapper('lu') });
  });
});
