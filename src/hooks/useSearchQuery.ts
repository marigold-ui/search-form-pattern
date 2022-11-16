import { useSearchParams } from 'react-router-dom';

export const useSearchParam = () => {
  const [params, setParams] = useSearchParams();

  const search = params.get('search') || '';
  const setSearch = (search: string) => setParams({ search });

  return [search, setSearch] as const;
};
