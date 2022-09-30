import { Box, MarigoldProvider } from '@marigold/components';

import Layout from './components/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import {
  ActiveThemeProvider,
  ActiveThemeConsumer,
} from './components/provider/ActiveThemeProvider';
import { StarWarsStoreProvider } from './hooks/useStarWarsStore';

const App = () => (
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
