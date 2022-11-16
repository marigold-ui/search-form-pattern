import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getJson } from '../api/getJson';
import { useSearchParam } from '../hook/useSearchQuery';
import { Button, Table } from '@marigold/components';
import { Eye } from '@marigold/icons';
import { Homeworld } from './Homeworld';
import { getIdFromUrl } from '../api/getIdFromUrl';
import { useSelectedParam } from '../hook/useSelectedParam';

export interface Data {
  results: any[];
}

export const useCharacterList = () => {
  const [search] = useSearchParam();
  const queryClient = useQueryClient();
  const { data, status, error } = useQuery({
    queryKey: ['search', search],
    queryFn: () =>
      getJson<Data>(`https://swapi.py4e.com/api/people/?search=${search}`),
    onSuccess: data => {
      data?.results.forEach(item =>
        queryClient.setQueryData(['character', getIdFromUrl(item.url)], item)
      );
    },
  });

  return { status, error, characters: data?.results || [] };
};

export const useCharacterDetail = () => {};

export const CharacterList = () => {
  const { characters } = useCharacterList();

  const [, setSelected] = useSelectedParam();

  return (
    <Table aria-label="Search results table">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Homeworld</Table.Column>
        <Table.Column>Details</Table.Column>
      </Table.Header>
      <Table.Body>
        {characters.map((character: any) => (
          <Table.Row key={character.name}>
            <Table.Cell>{character.name}</Table.Cell>
            <Table.Cell>
              <Homeworld id={getIdFromUrl(character?.homeworld)} />
            </Table.Cell>
            <Table.Cell>
              <Button
                variant="primary"
                size="xxsmall"
                onPress={() => setSelected(getIdFromUrl(character?.url))}
              >
                <Eye />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
