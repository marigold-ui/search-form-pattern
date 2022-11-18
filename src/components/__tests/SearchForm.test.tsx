import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchForm } from '../SearchForm';

test('renders search from', () => {
  render(<SearchForm />);

  const search = screen.getByLabelText('Search');
  expect(search).toBeInTheDocument();
});

test('invokes submit handler with search name and submits form', async () => {
  const searchName = userEvent.setup();

  const spy = jest.fn();

  render(<SearchForm />);

  const search = screen.getByPlaceholderText('Search...');

  await searchName.type(search, 'Luke');
  fireEvent.submit(screen.getByRole('form'));

  expect(spy.mock.calls).toMatchInlineSnapshot();
});
