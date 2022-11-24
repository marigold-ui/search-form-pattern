import { Text } from '@marigold/components';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJson } from '../api/getJson';

import { Character } from './DetailCard';
import { Film } from './Film';

export interface StarshipProps {
  id: number;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: Character;
  films: Film;
}

export const useStarships = (id: number) => {
  const { data, ...query } = useQuery({
    queryKey: ['starship', id],
    queryFn: () =>
      getJson<Starship>(`https://swapi.py4e.com/api/starships/${id}/`),
  });

  return { starship: data, ...query };
};

export const Starship = ({ id, ...props }: StarshipProps) => {
  const { starship } = useStarships(id);
  return <Text {...props}>{starship?.name}</Text>;
};
