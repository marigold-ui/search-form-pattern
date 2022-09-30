import { Aside, Box, Stack } from '@marigold/components';

import DetailCard from '../DetailCard';
import { Navigation } from '../Navigation';
import { ResultList } from '../ResultList';
import { SearchForm } from '../SearchForm';
import { SearchContextProvider } from '../provider';

export const Layout = () => {
  return (
    <SearchContextProvider>
      <Box id="#search-example">
        <Stack space="xlarge">
          <Navigation />
          <SearchForm />
          <Aside space="small" sideWidth="20em">
            <ResultList />
            <DetailCard />
          </Aside>
        </Stack>
      </Box>
    </SearchContextProvider>
  );
};
