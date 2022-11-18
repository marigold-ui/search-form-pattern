import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJson } from '../api/getJson';
import { Text } from '@marigold/components';

export interface FilmProps {
  id: number;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  url: string;
  created: Date;
  edited: Date;
}

export const useFilm = (id: number) => {
  const { data, ...query } = useQuery({
    queryKey: ['film', id],
    queryFn: () => getJson<Film>(`https://swapi.py4e.com/api/films/${id}/`),
  });
  return { film: data, ...query };
};

export const Film = ({ id, ...props }: FilmProps) => {
  const { film } = useFilm(id);
  return <Text {...props}>{film?.title}</Text>;
};
