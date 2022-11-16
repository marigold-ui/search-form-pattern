import { createContext, useState, ReactNode } from 'react';

export const SearchContext = createContext({} as any);

export interface SearchContextProviderProps {
  children?: ReactNode;
}

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
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
      {children}
    </SearchContext.Provider>
  );
};
