import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJson } from '../api/getJson';
import { Text } from '@marigold/components';
import { Planet } from './Homeworld';
import { Character } from './DetailCard';
import { Film } from './Film';

export interface SpeciesProps {
  id: number;
}

export interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: number;
  homeworld: Planet;
  language: string;
  people: Character[];
  films: Film[];
  created: Date;
  edited: Date;
  url: string;
}

export const useSpecies = (id: number) => {
  const { data: species, ...query } = useQuery({
    queryKey: ['species', id],
    queryFn: () =>
      getJson<Species>(`https://swapi.py4e.com/api/species/${id}/`),
  });

  return { species, ...query };
};

export const Species = ({ id, ...props }: SpeciesProps) => {
  const { species } = useSpecies(id);
  return <Text {...props}>{species?.name}</Text>;
};
