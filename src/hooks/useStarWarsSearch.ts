import useSWR from 'swr';
import { People, Planet } from './useStarWarsStore';

const fetcher = async ({ type = 'people', query }: any) => {
  let result;

  try {
    const response = await fetch(
      `https://swapi.dev/api/${type}/?search=${query}`
    );
    result = await response.json().then(json => json.results);

    if (type === 'people') {
      result = await Promise.all(
        result.map(async (p: any) => {
          const homeworld = await fetch(p.homeworld).then(res => res.json());
          return {
            ...p,
            homeworld,
          };
        })
      );
    }
  } catch (e) {
    console.error(e);
  }

  return result;
};

// Search
export interface ResultTypes {
  people: People[];
  planets: Planet[];
}

export interface UseStarWarsSearchProps<T extends keyof ResultTypes> {
  type?: T;
  query: string;
}

export interface SearchResult<T extends keyof ResultTypes> {
  state: 'idle' | 'loading' | 'success' | 'error';
  error: Error; // MAYBE?
  result: ResultTypes[T];
}

export const useStarWarsSearch = <T extends keyof ResultTypes = 'people'>({
  type,
  query,
}: UseStarWarsSearchProps<T>): SearchResult<T> => {
  const { data, error } = useSWR({ type: type || 'people', query }, fetcher);

  const loading = !error && !data;
  const state = error
    ? 'error'
    : loading
    ? 'loading'
    : data
    ? 'success'
    : 'idle';

  return { state, error, result: data };
};
