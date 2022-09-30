import { Aside, Box, Stack } from '@marigold/components';
import { createContext } from 'react';
import SearchForm from '../SearchForm';
import Navigation from '../Navigation';
import ResultList from '../ResultList';
import DetailCard from '../DetailCard';
import { SearchContextProvider } from '../provider/SearchContextProvider';

const Layout = () => {
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

export default Layout;
