import { SetStateAction, useContext, useState } from 'react';
import useSWR from 'swr';
import { Inline, TextField, Button } from '@marigold/components';
import { Search } from '@marigold/icons';
import { SearchContext } from '../Layout/Layout';

const SearchForm = () => {
  const { searchQuery, setSearchQuery, setSearchResult } =
    useContext(SearchContext);

  const fetcher: any = (url: RequestInfo | URL) =>
    fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    `https://swapi.dev/api/people/?search=${searchQuery}`,
    fetcher
  );

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Use FormData to get the input values
    const formData = new FormData(event.target as HTMLFormElement);
    // Optionally, convert FormData into an object
    const dataObject = Object.fromEntries(formData);
    // console.log(dataObject);
    event.target.reset();
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
