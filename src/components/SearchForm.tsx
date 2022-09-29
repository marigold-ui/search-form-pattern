import { SetStateAction, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { Inline, TextField, Button } from '@marigold/components';
import { Search } from '@marigold/icons';
import { SearchContext } from '../Layout/Layout';
import { useSearchParams } from 'react-router-dom';
import { useSearchParam } from 'react-use';
import { useStarWarsSearch } from '../hooks/useStarWarsSearch';
import { useStarWarsStore } from '../hooks/useStarWarsStore';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const { state, result } = useStarWarsSearch({ query });
  const { setPeople } = useStarWarsStore();

  useEffect(() => {
    if (state === 'success') {
      setPeople(result);
    }
  }, [state, result]);

  const handleSearch = (val: string) => {
    setQuery(val);
  };

  return (
    <form>
      <Inline space="small">
        <TextField
          type="search"
          label="Search"
          description="Type in what you are looking for!"
          placeholder="Search..."
          name="search"
          autoComplete="off"
          width="huge"
          value={query}
          onChange={handleSearch}
        />
        <Button variant="primary" size="small" type="submit">
          <Search /> Search
        </Button>
      </Inline>
    </form>
  );
};

export default SearchForm;

/**
 
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
    //event.target.reset();
  };

  const handleOnChange = (event: SetStateAction<string>) => {
    setSearchQuery(event);
    console.log(data && data.results);
    if (data) {
      setSearchResult(data);
    }
  };



 */
