import React from 'react';
import { render, screen } from '@testing-library/react';
import { Film, useFilm } from './Film';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const data: {
  title: 'A New Hope';
};

test('renders Film', id => {
  render(
    <QueryClientProvider client={queryClient}>
      <Film data-testid="film" id={0} />
    </QueryClientProvider>
  );

  const film = screen.getByTestId('film');
  expect(film).toBeInTheDocument();
});

// render film

// render film title

// Navigation renders

// Navigation has image

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

//
