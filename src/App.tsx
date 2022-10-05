import { Box, MarigoldProvider } from '@marigold/components';
import { BrowserRouter } from 'react-router-dom';

import { ActiveThemeProvider, ActiveThemeConsumer, Layout } from './components';
import { StarWarsStoreProvider } from './hooks';

const App = () => (
  /**
   * QA
   * Warum gibt es hier den ActiveThemeProvider und ActiveThemeConsumer.
   * Hätte nicht nur der Active Theme Provider gereicht?
   */
  <ActiveThemeProvider>
    <ActiveThemeConsumer>
      {({ themes, current }) => (
        <MarigoldProvider theme={themes[current]}>
          <StarWarsStoreProvider>
            <BrowserRouter>
              <Box
                css={{
                  p: 'medium',
                }}
              >
                <Layout />
              </Box>
            </BrowserRouter>
          </StarWarsStoreProvider>
        </MarigoldProvider>
      )}
    </ActiveThemeConsumer>
  </ActiveThemeProvider>
);

export default App;
