import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MarigoldProvider } from '@marigold/components';
import { ActiveThemeProvider, ActiveThemeConsumer } from '~/provider';
import { Navigation } from '../Navigation';

const queryClient = new QueryClient();
test('renders navigation', async () => {
  render(
    <ActiveThemeProvider>
      <ActiveThemeConsumer>
        {({ themes, current }) => (
          <MarigoldProvider theme={themes[current]}>
            <QueryClientProvider client={queryClient}>
              <Navigation />
            </QueryClientProvider>
          </MarigoldProvider>
        )}
      </ActiveThemeConsumer>
    </ActiveThemeProvider>
  );

  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

test('navigation contains themes', () => {
  render(
    <ActiveThemeProvider>
      <ActiveThemeConsumer>
        {({ themes, current }) => (
          <MarigoldProvider theme={themes[current]}>
            <QueryClientProvider client={queryClient}>
              <Navigation />
            </QueryClientProvider>
          </MarigoldProvider>
        )}
      </ActiveThemeConsumer>
    </ActiveThemeProvider>
  );

  const selector = screen.getByRole('button');
  expect(selector).toBeInTheDocument();
  expect(selector).toHaveTextContent('Theme: b2b');

  fireEvent.click(selector);
  const b2b = screen.getByText('b2b');
  const core = screen.getByText('core');
  const unicorn = screen.getByText('unicorn');

  expect(b2b).toBeInTheDocument();
  expect(core).toBeInTheDocument();
  expect(unicorn).toBeInTheDocument();
});

test('themes can be selected and closes menu', () => {
  render(
    <ActiveThemeProvider>
      <ActiveThemeConsumer>
        {({ themes, current }) => (
          <MarigoldProvider theme={themes[current]}>
            <QueryClientProvider client={queryClient}>
              <Navigation />
            </QueryClientProvider>
          </MarigoldProvider>
        )}
      </ActiveThemeConsumer>
    </ActiveThemeProvider>
  );

  const selector = screen.getByRole('button');
  expect(selector).toBeInTheDocument();
  expect(selector).toHaveTextContent('Theme: b2b');

  fireEvent.click(selector);

  const b2b = screen.getByText('b2b');
  const core = screen.getByText('core');
  const unicorn = screen.getByText('unicorn');

  expect(b2b).toBeInTheDocument();
  expect(core).toBeInTheDocument();
  expect(unicorn).toBeInTheDocument();

  fireEvent.click(core);

  expect(b2b).not.toBeInTheDocument();
  expect(unicorn).not.toBeInTheDocument();
});
