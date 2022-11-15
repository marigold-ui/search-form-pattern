import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getJson } from '../api/getJson';
import { useSelectedParam } from '../hook/useSelectedParam';

export const DetailCard = () => {
  const [id] = useSelectedParam();
  console.log(id);

  return id ? <Character id={Number(id)} /> : <strong>empty</strong>;
};

export interface CharacterProps {
  id: number;
}

const Character = ({ id }: CharacterProps) => {
  const { data } = useQuery({
    queryKey: ['character', id],
    queryFn: () => getJson(`https://swapi.py4e.com/api/people/${id}`),
  });

  // TODO: <Homeworld/>, <Film/>, ...
  return <div>{JSON.stringify(data)}</div>;
};
