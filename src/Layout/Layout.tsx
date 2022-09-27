import { Aside, Box, Stack } from '@marigold/components';
import React, { createContext, useState } from 'react';
import SearchForm from '../components/SearchForm';
import Navigation from '../components/Navigation';
import ResultList from '../components/ResultList';
import DetailCard from '../components/DetailCard';

export const SearchContext = createContext({} as any);

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [resultDetail, setResultDetail] = useState('');

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResult,
        setSearchResult,
        resultDetail,
        setResultDetail,
      }}
    >
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
    </SearchContext.Provider>
  );
};

export default Layout;
