import * as React from 'react';
import { SetStateAction, useContext, useState } from 'react';
import useSWR from 'swr';
import { Inline, TextField, Button } from '@marigold/components';
import { Search } from '@marigold/icons';
import { SearchContext } from '../Layout/Layout';
import { useSearchParams } from 'react-router-dom';
import { useSearchParam } from 'react-use';

const SearchForm = () => {
  //let [searchParams, setSearchParams] = useSearchParams();

  const { searchQuery, setSearchQuery, setSearchResult } =
    useContext(SearchContext);

  const fetcher: any = (url: RequestInfo | URL) =>
    fetch(url).then(res => res.json());

  const { data, error } = useSWR(
    `https://swapi.dev/api/people/?search=${searchQuery}`,
    fetcher
  );

  useSearchParam(searchQuery);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // The serialize function here would be responsible for
    // creating an object of { key: value } pairs from the
    // fields in the form that make up the query.
    history.pushState(data, '', location.pathname + '?search=' + searchQuery);

    //let params = serializeFormQuery(event.target);
    // setSearchParams(searchQuery);
  };

  const handleOnChange = (event: SetStateAction<string>) => {
    setSearchQuery(event);
    setSearchResult(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Inline space="small">
        <TextField
          label="Search"
          description="Type in what you are looking for!"
          placeholder="Search..."
          name="search"
          width="huge"
          value={searchQuery}
          onChange={handleOnChange}
        />
        <Button variant="primary" size="small" type="submit">
          <Search /> Search
        </Button>
      </Inline>
    </form>
  );
};

export default SearchForm;
