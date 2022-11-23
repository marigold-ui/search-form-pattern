import React from 'react';
import nock from 'nock';
import { screen, waitFor, render, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Film, useFilm } from '~/components';
import { getIdFromUrl } from './getIdFromUrl';
import { getJson } from './getJson';

// with that the error message from nock isn't shown
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

test('get json from and fetch url', async () => {
  nock('https://swapi.py4e.com').get('/api/films/1/').reply(
    200,
    {
      title: 'A new Hope',
      url: 'https://swapi.py4e.com/api/films/1/',
    },
    { 'Access-Control-Allow-Origin': '*' }
  );

  const url = 'https://swapi.py4e.com/api/films/1/';
  expect(await getJson(url));
});

test('error on response', async () => {
  nock('https://swapi.py4e.com')
    .get('/api/films')
    .reply(500, 'Network  failed', { 'Access-Control-Allow-Origin': '*' });
  const url = 'https://swapi.py4e.com/api/films';

  expect.assertions(1);
  return getJson(url).catch(e => {
    expect(e.message).toMatchInlineSnapshot(`"Network response was not ok"`);
  });
});

test('error on request', async () => {
  nock('https://swapi.py4e.com')
    .get('/api/films')
    .replyWithError('Network  failed');
  const url = 'https://swapi.py4e.com/api/films';
  expect.assertions(1);
  return getJson(url).catch(e => {
    expect(e.message).toMatchInlineSnapshot(`"Network request failed"`);
  });
});
