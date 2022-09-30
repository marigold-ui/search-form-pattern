import { FormEventHandler, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Inline, TextField, Button } from '@marigold/components';
import { Search } from '@marigold/icons';
import { useStarWarsSearch } from '../hooks/useStarWarsSearch';
import { useStarWarsStore } from '../hooks/useStarWarsStore';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('search') || '');
  const { state, result } = useStarWarsSearch({ query });
  const { setPeople } = useStarWarsStore();

  useEffect(() => {
    if (state === 'success') {
      setPeople(result);
    }
  }, [state, result]);

  const handleSearch: FormEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    const search = (data.get('search') as string) || '';
    setQuery(search);
    setSearchParams({ search });
  };

  return (
    <form onSubmit={handleSearch}>
      <Inline space="small">
        <TextField
          type="search"
          label="Search"
          description="Type in what you are looking for!"
          placeholder="Search..."
          name="search"
          autoComplete="off"
          width="huge"
          defaultValue={query}
        />
        <Button variant="primary" size="small" type="submit">
          <Search /> Search
        </Button>
      </Inline>
    </form>
  );
};

export default SearchForm;
