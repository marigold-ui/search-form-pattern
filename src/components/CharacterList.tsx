import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { getJson } from '../api/getJson';
import { useSearchParam } from '../hook/useSearchQuery';
import { Button, Table } from '@marigold/components';
import { Eye } from '@marigold/icons';
import { Homeworld } from './Homeworld';
import { getIdFromUrl } from '../api/getIdFromUrl';
import { useSelectedParam } from '../hook/useSelectedParam';

export const useCharacterList = () => {
  const [search] = useSearchParam();
  const { data, status, error } = useQuery({
    queryKey: ['search', search],
    queryFn: () =>
      getJson(`https://swapi.py4e.com/api/people/?search=${search}`),
  });

  return { status, error, characters: data?.results || [] };
};

export const CharacterList = () => {
  const { characters } = useCharacterList();

  const [, setSelected] = useSelectedParam();
  const handleOnPress = character => {
    setSelected(character?.name);
  };

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
                onPress={() => handleOnPress(character)}
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
