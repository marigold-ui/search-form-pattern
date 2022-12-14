import { Text } from '@marigold/components';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJson } from '../api/getJson';

export interface HomeworldProps {
  id: number;
}
export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
export const useHomeworld = (id: number) => {
  const { data, ...query } = useQuery({
    queryKey: ['homeworld', id],
    queryFn: () => getJson<Planet>(`https://swapi.py4e.com/api/planets/${id}/`),
  });

  return { homeworld: data, ...query };
};

export const Homeworld = ({ id, ...props }: HomeworldProps) => {
  const { homeworld } = useHomeworld(id);
  return <Text {...props}>{homeworld?.name}</Text>;
};
