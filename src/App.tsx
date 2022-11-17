import { Aside, Box, Stack } from '@marigold/components';
import { Suspense } from 'react';
import { CharacterList, DetailCard, SearchForm } from './components';
import CardLoader from './components/CardLoader';
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
            <Suspense fallback={<CardLoader />}>
              <CharacterList />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<CardLoader />}>
              <DetailCard />
            </Suspense>
          </div>
        </Aside>
      </Stack>
    </Box>
  );
};

export default App;
