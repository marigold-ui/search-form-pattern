import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, getIdFromUrl } from './api';
import { PeopleResponse, Planet } from './useStarWarsStore';

export const useSearch = (query: string) => {
  const queryClient = useQueryClient();

  const peopleResults = useQueries({
    queries: [
      {
        queryKey: ['search', 'person', query],
      },
      {
        queryFn: () =>
          get<PeopleResponse[]>(
            `https://swapi.py4e.com/api/people/?search=${query}`
          ),
      },
      {
        onSuccess: (data: any) => {
          queryClient.setQueryData(
            ['people', getIdFromUrl(data.person?.url)],
            data.person
          );
        },
      },
    ],
  });

  const { data: homeworld } = useQuery({
    queryKey: ['planet', getIdFromUrl(person?.homeworld)],
    queryFn: () => get<Planet>(`https://swapi.py4e.com/api/planet/${id}`),
    onSuccess: planet => {
      queryClient.setQueryData(['planet', getIdFromUrl(planet.url)], planet);
    },
    enabled: !!person?.homeworld,
  });

  return { status, people: peopleResults };
};
