import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { MarigoldProvider } from '@marigold/components';

import {
  ActiveThemeProvider,
  ActiveThemeConsumer,
  SwapiProvider,
} from './provider';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ActiveThemeProvider>
    <ActiveThemeConsumer>
      {({ themes, current }) => (
        <MarigoldProvider theme={themes[current]}>
          <SwapiProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SwapiProvider>
        </MarigoldProvider>
      )}
    </ActiveThemeConsumer>
  </ActiveThemeProvider>
);
