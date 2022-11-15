import { Text } from '@marigold/components';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJson } from '../api/getJson';

export interface HomeworldProps {
  id: number;
}

export const useHomeworld = (id: number) => {
  const { data: homeworld } = useQuery({
    queryKey: ['homeworld', id],
    queryFn: () => getJson(`https://swapi.py4e.com/api/planets/${id}`),
  });

  return { homeworld };
};

export const Homeworld = ({ id }: HomeworldProps) => {
  const { homeworld } = useHomeworld(id);
  return <Text>{homeworld?.name}</Text>;
};
