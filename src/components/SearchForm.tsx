import React, { FormEventHandler } from 'react';
import { Button, Inline, TextField } from '@marigold/components';
import { Search } from '@marigold/icons';

import { useSearchParam } from '../hooks/useSearchQuery';

export interface SearchFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const SearchForm = () => {
  const [search, setSearch] = useSearchParam();
  const handleSubmit: FormEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();
    const data = new FormData(ev.target as HTMLFormElement);
    const search = (data.get('search') as string) || '';
    setSearch(search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Inline space="small">
        <TextField
          type="search"
          label="Search"
          description="Type in what you are looking for!"
          placeholder="Search..."
          name="search"
          autoComplete="off"
          width="huge"
          defaultValue={search}
        />
        <Button variant="primary" size="small" type="submit">
          <Search /> Search
        </Button>
      </Inline>
    </form>
  );
};
