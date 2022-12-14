import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { getJson } from '../api/getJson';
import { useSearchParam } from '../hooks/useSearchQuery';
import { Button, Table, Text } from '@marigold/components';
import { Eye } from '@marigold/icons';
import { Homeworld } from './Homeworld';
import { getIdFromUrl } from '../api/getIdFromUrl';
import { useSelectedParam } from '../hooks/useSelectedParam';

export interface Data {
  results: any[];
}

export const useCharacterList = () => {
  const [search] = useSearchParam();
  const queryClient = useQueryClient();
  const { data, status, error, ...query } = useQuery({
    queryKey: ['search', search],
    queryFn: () =>
      getJson<Data>(`https://swapi.py4e.com/api/people/?search=${search}`),
    onSuccess: data => {
      data?.results.forEach(item =>
        queryClient.setQueryData(['character', getIdFromUrl(item.url)], item)
      );
    },
  });

  return { status, ...query, error, search, characters: data?.results || [] };
};

export const CharacterList = () => {
  const { characters, search } = useCharacterList();

  const [, setSelected] = useSelectedParam();

  if (characters.length === 0 || search === '') {
    return <Text>No character found.</Text>;
  }

  return (
    <Table aria-label="Search results table" variant="compact">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Homeworld</Table.Column>
        <Table.Column>Details</Table.Column>
      </Table.Header>
      <Table.Body>
        {characters.map((character: any) => (
          <Table.Row key={character.name}>
            <Table.Cell>
              <Text>{character.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Homeworld id={getIdFromUrl(character?.homeworld)} />
            </Table.Cell>
            <Table.Cell>
              <Button
                aria-label="view"
                variant="ghost"
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
