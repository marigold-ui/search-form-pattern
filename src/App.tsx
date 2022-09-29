import { Box, MarigoldProvider } from '@marigold/components';
//import theme from '@marigold/theme-unicorn';

import Layout from './Layout/Layout';
import {
  ActiveThemeProvider,
  ActiveThemeConsumer,
} from './components/ActiveThemeProvider';

const App = () => (
  <ActiveThemeProvider>
    <ActiveThemeConsumer>
      {({ themes, current }) => (
        <MarigoldProvider theme={themes[current]}>
          <Box
            css={{
              p: 'medium',
            }}
          >
            <Layout />
          </Box>
        </MarigoldProvider>
      )}
    </ActiveThemeConsumer>
  </ActiveThemeProvider>
);

export default App;
