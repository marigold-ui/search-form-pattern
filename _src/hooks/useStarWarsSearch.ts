import useSWR from 'swr';
import { People, PeopleResponse, Planet, Film } from './useStarWarsStore';

const fetchConfig: RequestInit = {};

const fetcher = async ({ type = 'people', query }: any) => {
  let result;

  try {
    const response = await fetch(
      `https://swapi.py4e.com/api/${type}/?search=${query}`,
      fetchConfig
    );
    result = await response.json().then(json => json.results);

    if (type === 'people') {
      result = await Promise.all(
        result.map(async (p: PeopleResponse) => {
          const [homeworld, ...rest] = await Promise.all([
            fetch(p.homeworld, fetchConfig).then(res => res.json()),
            ...p.films.map(async (link: any) => {
              const res = await fetch(link, fetchConfig);
              return await res.json();
            }),
            ...p.vehicles.map(async (link: any) => {
              const res = await fetch(link, fetchConfig);
              return await res.json();
            }),
          ]);

          const films = rest.slice(0, p.films.length);
          const vehicles = rest.slice(p.films.length);

          return {
            ...p,
            homeworld,
            films,
            vehicles,
          } as People;
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
  films: Film[];
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
