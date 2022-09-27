import {
  Box,
  extendTheme,
  MarigoldProvider,
  Theme as BaseTheme,
} from '@marigold/components';
//import theme from '@marigold/theme-unicorn';

import Layout from './Layout/Layout';
import { MarigoldThemeSwitch } from './components/ThemeMenuContext';

import unicornTheme from '@marigold/theme-unicorn';
import b2bTheme from '@marigold/theme-b2b';
import coreTheme from '@marigold/theme-core';

import { __defaultTheme } from '@marigold/system';

const themes = {
  unicornTheme,
  b2bTheme,
  coreTheme,
};

function App() {
  return (
    <MarigoldProvider theme={__defaultTheme}>
      <MarigoldThemeSwitch themes={themes}>
        <Box
          css={{
            p: 'medium',
          }}
        >
          <Layout />
        </Box>
      </MarigoldThemeSwitch>
    </MarigoldProvider>
  );
}

export default App;
