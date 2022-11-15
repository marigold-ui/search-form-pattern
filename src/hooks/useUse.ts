import { useQuery, useQueries } from '@tanstack/react-query';
import { Film, People, PeopleResponse } from './useStarWarsStore';

// Helper
const getIdFromUrl = url => /** get that id! */ ();

const get = async <T = unknown>(url:string):Promise<T> => fetch(url).then(res => res.json()); 

export const useSearchPeople = (query:string) => {
    const { data: person } = useQuery(['people', query], () => get<PeopleResponse>(`https://swapi.py4e.com/api/people/?search=${query}`));
    
    const { data: homeworld } = useQuery({
        queryKey: ['planet', getIdFromUrl(person?.homeworld)],
        queryFn: () => get(person?.homeworld!),
        enabled: !!person?.homeworld
    });
    
    const filmResults = useQueries({
        queries: (person?.films || []).map(film => ({
            queryKey: ['film', getIdFromUrl(film)],
            queryFn: () => get<Film>(film),
            enabled: !!person?.films // necessary!?
        }))
    });

    return {
        ...person,
        homeworld,
        films: filmResults.map(r => r.data),
    } as People;
}
