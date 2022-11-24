import React from 'react';
import nock from 'nock';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Character, DetailCard } from '../DetailCard';
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { getJson } from '~/api/getJson';

nock('https://swapi.py4e.com').get('/api/planets/1/').reply(
  200,
  {
    name: 'Tatooine',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

nock('https://swapi.py4e.com')
  .get('/api/people/1/')
  .reply(
    200,
    {
      birth_year: '19BBY',
      eye_color: 'blue',
      films: [
        'https://swapi.py4e.com/api/films/1/',
        'https://swapi.py4e.com/api/films/2/',
        'https://swapi.py4e.com/api/films/3/',
        'https://swapi.py4e.com/api/films/6/',
        'https://swapi.py4e.com/api/films/7/',
      ],
      gender: 'male',
      hair_color: 'blond',
      height: '172',
      homeworld: 'https://swapi.py4e.com/api/planets/1/',
      mass: '77',
      name: 'Luke Skywalker',
      skin_color: 'fair',
      species: ['https://swapi.py4e.com/api/species/1/'],
      starships: [
        'https://swapi.py4e.com/api/starships/12/',
        'https://swapi.py4e.com/api/starships/22/',
      ],
      url: 'https://swapi.py4e.com/api/people/1/',
      vehicles: [
        'https://swapi.py4e.com/api/vehicles/14/',
        'https://swapi.py4e.com/api/vehicles/30/',
      ],
    },
    { 'Access-Control-Allow-Origin': '*' }
  );

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <MemoryRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </MemoryRouter>
);

test('fetch is loading', async () => {
  const id = 1;
  const { result } = renderHook(
    () =>
      useQuery({
        queryKey: ['character', id],
        queryFn: () =>
          getJson<Character>(`https://swapi.py4e.com/api/people/${id}/`),
      }),
    { wrapper }
  );

  await waitFor(() => expect(result.current.isLoading).toBe(true));
  expect(result.current.isLoading).toMatchInlineSnapshot(`true`);
});

test('fetch data is Success', async () => {
  const id = 1;
  const { result } = renderHook(
    () =>
      useQuery({
        queryKey: ['character', id],
        queryFn: () =>
          getJson<Character>(`https://swapi.py4e.com/api/people/${id}/`),
      }),
    { wrapper }
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toMatchInlineSnapshot(`
    {
      "birth_year": "19BBY",
      "eye_color": "blue",
      "films": [
        "https://swapi.py4e.com/api/films/1/",
        "https://swapi.py4e.com/api/films/2/",
        "https://swapi.py4e.com/api/films/3/",
        "https://swapi.py4e.com/api/films/6/",
        "https://swapi.py4e.com/api/films/7/",
      ],
      "gender": "male",
      "hair_color": "blond",
      "height": "172",
      "homeworld": "https://swapi.py4e.com/api/planets/1/",
      "mass": "77",
      "name": "Luke Skywalker",
      "skin_color": "fair",
      "species": [
        "https://swapi.py4e.com/api/species/1/",
      ],
      "starships": [
        "https://swapi.py4e.com/api/starships/12/",
        "https://swapi.py4e.com/api/starships/22/",
      ],
      "url": "https://swapi.py4e.com/api/people/1/",
      "vehicles": [
        "https://swapi.py4e.com/api/vehicles/14/",
        "https://swapi.py4e.com/api/vehicles/30/",
      ],
    }
  `);
});

// with that the error message from nock isn't shown
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('failing', async () => {
  nock('https://swapi.py4e.com')
    .get('/api/people/404')
    .reply(500, 'whoopsie', { 'Access-Control-Allow-Origin': '*' });

  const id = 404;
  const { result } = renderHook(
    () =>
      useQuery({
        queryKey: ['character', id],
        queryFn: () =>
          getJson<Character>(`https://swapi.py4e.com/api/people/${id}/`),
        retryDelay: 100,
      }),
    { wrapper }
  );

  await waitFor(() => expect(result.current.status).toBe('error'));
  expect(result.current.isError).toMatchInlineSnapshot(`true`);
});

test('renders detail view', async () => {
  const id = 1;
  const { result } = renderHook(
    () =>
      useQuery({
        queryKey: ['character', id],
        queryFn: () =>
          getJson<Character>(`https://swapi.py4e.com/api/people/${id}/`),
      }),
    { wrapper }
  );
  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  render(
    <MemoryRouter initialEntries={['?search=luke&selected=1']}>
      <QueryClientProvider client={queryClient}>
        <DetailCard />
      </QueryClientProvider>
    </MemoryRouter>
  );

  expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  expect(screen.getByText('19BBY')).toBeInTheDocument();
  expect(screen.getByText('Gender: male')).toBeInTheDocument();
  expect(screen.getByText('Height: 172')).toBeInTheDocument();
  expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
  expect(screen.getByText('Hair Color: blond')).toBeInTheDocument();
  expect(screen.getByText('Skin Color: fair')).toBeInTheDocument();
  expect(result.current.data.films.length).toBe(5);
  expect(result.current.data.vehicles.length).toBe(2);
  expect(result.current.data.starships.length).toBe(2);
  expect(result.current.data.homeworld).toBeDefined();
});
