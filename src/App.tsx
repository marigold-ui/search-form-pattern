import { Box, MarigoldProvider } from '@marigold/components';
//import theme from '@marigold/theme-unicorn';

import Layout from './Layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import {
  ActiveThemeProvider,
  ActiveThemeConsumer,
} from './components/ActiveThemeProvider';

const App = () => (
  <ActiveThemeProvider>
    <ActiveThemeConsumer>
      {({ themes, current }) => (
        <MarigoldProvider theme={themes[current]}>
          <BrowserRouter>
            <Box
              css={{
                p: 'medium',
              }}
            >
              <Layout />
            </Box>
          </BrowserRouter>
        </MarigoldProvider>
      )}
    </ActiveThemeConsumer>
  </ActiveThemeProvider>
);

export default App;
