import React from 'react';
import { Body, Box, Button, MarigoldProvider } from '@marigold/components';
import theme from '@marigold/theme-unicorn';

import Layout from './Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <MarigoldProvider theme={theme}>
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
  );
}

export default App;
