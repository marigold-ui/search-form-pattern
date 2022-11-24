import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from '../SearchForm';
import { MemoryRouter } from 'react-router-dom';

test('renders search from', () => {
  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const search = screen.getByLabelText('Search');
  expect(search).toBeInTheDocument();
});

test('text can be written in search input', async () => {
  const searchName = userEvent.setup();

  render(
    <MemoryRouter>
      <SearchForm />
    </MemoryRouter>
  );

  const search = screen.getByPlaceholderText('Search...');
  await searchName.type(search, 'Luke');
  expect(search).toHaveValue('Luke');
});

test('search submit with click', () => {
  const spy = jest.fn();
  render(
    <MemoryRouter>
      <SearchForm onSubmit={spy} />
    </MemoryRouter>
  );

  fireEvent.submit(screen.getByRole('form'));
  expect(spy).toHaveBeenCalled();
});
