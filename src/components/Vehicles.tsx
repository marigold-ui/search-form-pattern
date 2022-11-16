import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getJson } from '../api/getJson';
import { Text } from '@marigold/components';

import { Character } from './DetailCard';

export interface VehiclesProps {
  id: number;
}

export interface Vehicles {
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
  vehicle_class: string;
  pilots: Character;
}

export const useVehicals = (id: number) => {
  const { data: vehicles } = useQuery({
    queryKey: ['vehicles', id],
    queryFn: () =>
      getJson<Vehicles>(`https://swapi.py4e.com/api/vehicles/${id}/`),
  });

  return { vehicles };
};

export const Vehicles = ({ id }: VehiclesProps) => {
  const { vehicles } = useVehicals(id);
  return <Text>{vehicles?.name}</Text>;
};
