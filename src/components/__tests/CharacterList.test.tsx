import React from 'react';
import nock from 'nock';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CharacterList, useCharacterList } from '../CharacterList';
import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom';
import routeData from 'react-router';

nock('https://swapi.py4e.com')
  .get('/api/people/?search=lu')
  .reply(
    200,
    {
      results: [
        { name: 'Luke', planet: 'Tatooine' },
        { name: 'Luminara', planet: 'Mirial' },
      ],
    },
    { 'Access-Control-Allow-Origin': '*' }
  );

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('fetch characterlist', async () => {
  const { result } = renderHook(() => useCharacterList(), { wrapper });
  render(
    <BrowserRouter>
      <CharacterList />
    </BrowserRouter>
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.characters).toMatchInlineSnapshot();
});
