import {
  Card,
  Header,
  Center,
  Headline,
  Body,
  Container,
  Stack,
  List,
  Inline,
  Text,
} from '@marigold/components';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getIdFromUrl } from '../api/getIdFromUrl';
import { getJson } from '../api/getJson';
import { useSelectedParam } from '../hook/useSelectedParam';
import { Film } from './Film';
import { Homeworld } from './Homeworld';

export const DetailCard = () => {
  const [id] = useSelectedParam();

  return id ? <Character id={Number(id)} /> : <strong>empty</strong>;
};

export interface CharacterProps {
  id: number;
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: any[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

const Character = ({ id }: CharacterProps) => {
  const { data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () =>
      getJson<Character>(`https://swapi.py4e.com/api/people/${id}/`),
  });

  // console.log(character);
  // TODO: <Homeworld/>, <Film/>, ...
  return (
    <Card aria-hidden="false">
      <Header>
        <Center>
          <Headline level="2">{character?.name}</Headline>
          <Headline level="3">{character?.birth_year}</Headline>
        </Center>
      </Header>
      <Body>
        <Container>
          <Stack space="medium">
            <List>
              {character?.gender === 'n/a' ? (
                <List.Item>
                  <Text>{character?.species}</Text>
                </List.Item>
              ) : (
                <List.Item>
                  <Text>Gender: {character?.gender}</Text>
                </List.Item>
              )}
              <List.Item>
                <Text>Height: {character?.height}</Text>
              </List.Item>
              <List.Item>
                <Text>Mass: {character?.mass}</Text>
              </List.Item>
              <List.Item>
                <Text>Eye Color: {character?.eye_color}</Text>
              </List.Item>
              <List.Item>
                <Text>Hair Color: {character?.hair_color}</Text>
              </List.Item>
              <List.Item>
                <Text>Skin Color: {character?.skin_color}</Text>
              </List.Item>
              {character?.homeworld && (
                <List.Item>
                  <Inline>
                    <Text>Homeworld: </Text>
                    <Homeworld id={getIdFromUrl(character?.homeworld)} />
                  </Inline>
                </List.Item>
              )}
              {character?.films && (
                <List.Item>
                  <Inline>
                    <Text>Films: </Text>
                    {character?.films.map(film => (
                      <Film key={film} id={getIdFromUrl(film)} />
                    ))}
                  </Inline>
                </List.Item>
              )}
            </List>
          </Stack>
        </Container>
      </Body>
    </Card>
  );
};
