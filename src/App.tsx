import React from 'react';
import { Body, Box, Button, MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-unicorn';

import Layout from './Layout/Layout';

function App() {
  return (
    <MarigoldProvider theme={theme}>
      <Box
        css={{
          p: 'medium',
        }}
      >
        <Layout />
      </Box>
    </MarigoldProvider>
  );
}

export default App;
