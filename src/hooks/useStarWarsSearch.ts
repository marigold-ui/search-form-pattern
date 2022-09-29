import useSWR from 'swr';

// Search
export interface UseStarWarsSearchProps {
  type?: 'planets' | 'spaceships' | 'vehicles' | 'people' | 'films' | 'species';
  query: string;
}

export type SearchState = 'idle' | 'loading' | 'sucess' | 'error';

const fetcher = (url: RequestInfo | URL) => fetch(url).then(res => res.json());

export const useStarWarsSearch = ({ query }: UseStarWarsSearchProps) => {
  const { data, error } = useSWR(
    `https://swapi.dev/api/people/?search=${query}`,
    fetcher
  );

  const loading = !error && !data;
  const result = data && data.results;

  const state = error
    ? 'error'
    : loading
    ? 'loading'
    : data
    ? 'success'
    : 'idle';

  return { state, error, result };
};
