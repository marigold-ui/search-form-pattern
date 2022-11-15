import { useSearchParams } from 'react-router-dom';

export const useSelectedParam = () => {
  const [params, setParams] = useSearchParams();

  const selected = params.get('selected') || '';
  const setSelected = (selected: any) =>
    setParams({
      ...Object.fromEntries(params.entries()),
      // TODO: Keep other params
      selected,
    });

  return [selected, setSelected] as const;
};
