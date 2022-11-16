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
import { getIdFromUrl } from '../api/getIdFromUrl';
import { getJson } from '../api/getJson';
import { useSelectedParam } from '../hooks/useSelectedParam';
import { Film } from './Film';
import { Homeworld } from './Homeworld';
import { Species } from './Species';
import { Vehicles } from './Vehicles';
import { Starship } from './Starships';

export const DetailCard = () => {
  const [id] = useSelectedParam();

  return id ? <Character id={Number(id)} /> : null;
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
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

const Character = ({ id }: CharacterProps) => {
  const { status, data: character } = useQuery({
    queryKey: ['character', id],
    queryFn: () =>
      getJson<Character>(`https://swapi.py4e.com/api/people/${id}/`),
  });

  if (status === 'loading') {
    return <div>loading...</div>;
  }

  if (status === 'error') {
    return <div>ERRRRR Bib bop...</div>;
  }

  return (
    <Card aria-hidden="false">
      <Header>
        <Center>
          <Headline level="2">{character.name}</Headline>
          <Headline level="3">{character.birth_year}</Headline>
        </Center>
      </Header>
      <Body>
        <Container>
          <Stack space="medium">
            <List>
              {character.gender === 'n/a' ? (
                <List.Item>
                  <Inline space="xxsmall">
                    <Text>Species:</Text>
                    {character.species.map(specie => (
                      <Species key={specie} id={getIdFromUrl(specie)} />
                    ))}
                  </Inline>
                </List.Item>
              ) : (
                <List.Item>
                  <Text>Gender: {character.gender}</Text>
                </List.Item>
              )}
              <List.Item>
                <Text>Height: {character.height}</Text>
              </List.Item>
              <List.Item>
                <Text>Mass: {character.mass}</Text>
              </List.Item>
              <List.Item>
                <Text>Eye Color: {character.eye_color}</Text>
              </List.Item>
              <List.Item>
                <Text>Hair Color: {character.hair_color}</Text>
              </List.Item>
              <List.Item>
                <Text>Skin Color: {character.skin_color}</Text>
              </List.Item>
              <List.Item>
                <Inline space="xxsmall">
                  <Text>Homeworld:</Text>
                  <Homeworld id={getIdFromUrl(character.homeworld)} />
                </Inline>
              </List.Item>
              <List.Item>
                <Text>Films:</Text>
                <List>
                  {character.films.map(film => (
                    <List.Item key={film}>
                      <Film id={getIdFromUrl(film)} />
                    </List.Item>
                  ))}
                </List>
              </List.Item>
              {character.vehicles.length !== 0 && (
                <List.Item>
                  <Text>Vehicles:</Text>
                  <List>
                    {character.vehicles.map(vehicle => (
                      <List.Item key={vehicle}>
                        <Vehicles id={getIdFromUrl(vehicle)} />
                      </List.Item>
                    ))}
                  </List>
                </List.Item>
              )}
              {character.starships.length !== 0 && (
                <List.Item>
                  <Text>Spaceships:</Text>
                  <List>
                    {character.starships.map(starship => (
                      <List.Item key={starship}>
                        <Starship id={getIdFromUrl(starship)} />
                      </List.Item>
                    ))}
                  </List>
                </List.Item>
              )}
            </List>
          </Stack>
        </Container>
      </Body>
    </Card>
  );
};
