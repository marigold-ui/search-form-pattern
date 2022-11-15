import { useSearchParams } from 'react-router-dom';

export const useSelectedParam = () => {
  const [params, setParams] = useSearchParams();

  const selected = params.get('selected') || '';
  const setSelected = (selected: string) =>
    setParams({
      selected,
    });

  return [selected, setSelected] as const;
};
