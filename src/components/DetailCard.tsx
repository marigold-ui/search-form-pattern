import {
  Card,
  Header,
  Center,
  Headline,
  Body,
  Container,
  List,
  Stack,
} from '@marigold/components';
import { useContext } from 'react';
import { SearchContext } from '../Layout/Layout';
import CardList from './CardList';

const DetailCard = () => {
  const { resultDetail } = useContext(SearchContext);
  console.log(resultDetail);

  /**
   * To Do's
   *
   * Headline -> Name
   * Subheadline -> Geburtstag
   *
   * If Human -> Show gender informationen
   *
   * If Android -> Show species information
   *
   * As List
   *  - eye color
   *  - height
   *  - mass
   *  - skin color
   *  - gender / species
   *
   *
   * Films, Planet, Starship, vehicels
   *
   */

  if (resultDetail) {
    return (
      <Card aria-hidden="false">
        <Header>
          <Center>
            <Headline level="2">{resultDetail?.name}</Headline>
            <Headline level="3">{resultDetail?.birth_year}</Headline>
          </Center>
        </Header>
        <Body>
          <Container>
            <Stack space="medium">
              <List>
                {resultDetail?.gender === 'n/a' ? (
                  <List.Item>{resultDetail?.species}</List.Item>
                ) : (
                  <List.Item>Gender: {resultDetail?.gender}</List.Item>
                )}
                <List.Item>Height: {resultDetail?.height}</List.Item>
                <List.Item>Mass: {resultDetail?.mass}</List.Item>
                <List.Item>Eye Color: {resultDetail?.eye_color}</List.Item>
                <List.Item>Hair Color: {resultDetail?.hair_color}</List.Item>
                <List.Item>Skin Color: {resultDetail?.skin_color}</List.Item>
                <List.Item>Homeworld: {resultDetail?.homeworld}</List.Item>
              </List>
              <CardList headline={'Filme'} data={resultDetail?.films} />
              <CardList headline={'Fahrzeuge'} data={resultDetail?.vehicles} />
              <CardList
                headline={'Raumschiffe'}
                data={resultDetail?.starships}
              />
            </Stack>
          </Container>
        </Body>
      </Card>
    );
  } else {
    return null;
  }
};

export default DetailCard;
