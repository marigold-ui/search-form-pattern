import { Button, Table } from '@marigold/components';
import { Eye } from '@marigold/icons';
import { useContext } from 'react';
import { SearchContext } from '../Layout/Layout';

const ResultList = () => {
  const { searchResult, setResultDetail } = useContext(SearchContext);

  // console.log('searchResult', searchResult?.results);
  const onPressHandler = (item: any) => {
    setResultDetail(item);
  };

  return (
    <Table aria-label="Table">
      <Table.Header>
        <Table.Column>Details</Table.Column>
        <Table.Column>Name</Table.Column>
        <Table.Column>Homeworld</Table.Column>
      </Table.Header>
      <Table.Body>
        {searchResult?.results?.map((item: any) => (
          <Table.Row key={item.name}>
            <Table.Cell>
              <Button
                variant="primary"
                onPress={() => onPressHandler(item)}
                size="small"
              >
                <Eye />
              </Button>
            </Table.Cell>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.homeworld}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ResultList;
