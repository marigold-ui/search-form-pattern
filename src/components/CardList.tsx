import { Headline, List } from '@marigold/components';

export interface CardListProps {
  headline: string;
  data: any;
}

const CardList = ({ headline, data }: CardListProps) => {
  if (data?.length != 0) {
    return (
      <>
        <Headline level="2">{headline}</Headline>
        <List>
          {data?.map((item: any) => (
            <List.Item key={item}>{item}</List.Item>
          ))}
        </List>
      </>
    );
  } else {
    return null;
  }
};

export default CardList;
