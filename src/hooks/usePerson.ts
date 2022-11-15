import { useQueries, useQuery } from '@tanstack/react-query';
import { get, getIdFromUrl } from './api';
import { Film, People, PeopleResponse, Planet } from './useStarWarsStore';

export const usePerson = (id: number) => {
  const { data: person } = useQuery({
    queryKey: ['people', id],
    queryFn: () =>
      get<PeopleResponse[]>(`https://swapi.py4e.com/api/people/?search=${id}`),
  });

  const { data: homeworld } = useQuery({
    queryKey: ['planet', getIdFromUrl(person?.homeworld)],
    queryFn: () =>
      get<Planet>(`https://swapi.py4e.com/api/planet/?search=${id}`),
    enabled: !!person?.homeworld,
  });

  const filmResults = useQueries({
    queries: (person?.films || []).map(film => ({
      queryKey: ['film', getIdFromUrl(film)],
      queryFn: () =>
        get<Film[]>(`https://swapi.py4e.com/api/films/?search=${id}`),
      enabled: !!person?.films, // necessary!?
    })),
  });
  return {
    ...person,
    homeworld,
    films: filmResults.map(r => r.data),
  } as People;
};

const API = `https://swapi.py4e.com/api/${type}/${id}`;
