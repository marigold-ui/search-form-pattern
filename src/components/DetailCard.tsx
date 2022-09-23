import {
  Card,
  Header,
  Center,
  Headline,
  Body,
  Container,
} from '@marigold/components';
import { useContext } from 'react';
import { SearchContext } from '../Layout/Layout';

const DetailCard = () => {
  const { resultDetail } = useContext(SearchContext);

  return (
    <Card aria-hidden="false">
      <Header>
        <Center>
          <Headline level="2">Detail</Headline>
        </Center>
      </Header>
      <Body>
        <Container>Detailview from Search: {resultDetail?.name}</Container>
      </Body>
    </Card>
  );
};

export default DetailCard;
