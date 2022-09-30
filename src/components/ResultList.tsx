import { Button, Table } from '@marigold/components';
import { Eye } from '@marigold/icons';
import { useContext } from 'react';
import { useStarWarsStore } from '../hooks/useStarWarsStore';
import { SearchContext } from '../Layout/Layout';

const ResultList = () => {
  const { setResultDetail } = useContext(SearchContext);

  const { people } = useStarWarsStore();

  const onPressHandler = (item: any) => {
    setResultDetail(item);
  };

  return (
    <Table aria-label="Search results table">
      <Table.Header>
        <Table.Column>Name</Table.Column>
        <Table.Column>Homeworld</Table.Column>
        <Table.Column>Details</Table.Column>
      </Table.Header>
      <Table.Body>
        {people.map((item: any) => (
          <Table.Row key={item.name}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item?.homeworld?.name}</Table.Cell>
            <Table.Cell>
              <Button
                variant="primary"
                onPress={() => onPressHandler(item)}
                size="small"
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

export default ResultList;
