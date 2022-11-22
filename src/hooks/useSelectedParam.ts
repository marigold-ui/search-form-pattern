import { useSearchParams } from 'react-router-dom';
import { useSearchParam } from './useSearchQuery';

export const useSelectedParam = () => {
  const [params, setParams] = useSearchParams();
  const [search] = useSearchParam();
  const selected = params.get('selected') || '';
  const setSelected = (selected: any) =>
    setParams({
      ...Object.fromEntries(params.entries()),
      search,
      selected,
    });

  return [selected, setSelected] as const;
};
