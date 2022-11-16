import { Aside, Box, Stack } from '@marigold/components';
import React from 'react';
import { CharacterList, DetailCard, SearchForm } from './components';
import { Navigation } from './components/Navigation';

const App = () => {
  return (
    <Box
      css={{
        p: 'medium',
      }}
    >
      <Stack space="xlarge">
        <Navigation />
        <SearchForm />
        <Aside space="large">
          <div>
            <CharacterList />
          </div>
          <div>
            <DetailCard />
          </div>
        </Aside>
      </Stack>
    </Box>
  );
};

export default App;
