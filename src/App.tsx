import { Aside, Box, Stack } from '@marigold/components';
import { Suspense } from 'react';
import { CharacterList, DetailCard, SearchForm } from './components';
import { Navigation } from './components/Navigation';

const Loading = () => <strong>loading...!!!</strong>;

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
            <Suspense fallback={<Loading />}>
              <DetailCard />
            </Suspense>
          </div>
        </Aside>
      </Stack>
    </Box>
  );
};

export default App;
