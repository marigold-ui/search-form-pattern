import React from 'react';
import nock from 'nock';
import { render, renderHook, screen, waitFor } from '@testing-library/react';
import { Vehicles, useVehicals } from '../Vehicles';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

nock('https://swapi.py4e.com').get('/api/vehicles/1/').reply(
  200,
  {
    name: 'Sand Crawler',
  },
  { 'Access-Control-Allow-Origin': '*' }
);

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('fetch vehicles', async () => {
  const { result } = renderHook(() => useVehicals(1), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.vehicles).toMatchInlineSnapshot(`
    {
      "title": "Sand Crawler",
    }
  `);
});

test('renders vehicles name', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Vehicles data-testid="1" id={1} />
    </QueryClientProvider>
  );

  await waitFor(() =>
    expect(screen.getByText('Sand Crawler')).toBeInTheDocument()
  );
});
