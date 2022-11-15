import React from 'react';
import { CharacterList, DetailCard, SearchForm } from './components';

const App = () => {
  return (
    <>
      <SearchForm />
      <CharacterList />
      <DetailCard />
    </>
  );
};

export default App;
