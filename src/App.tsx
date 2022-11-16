import { Aside } from '@marigold/components';
import React from 'react';
import { CharacterList, DetailCard, SearchForm } from './components';
import { Navigation } from './components/Navigation';

const App = () => {
  return (
    <>
      <Navigation />
      <SearchForm />
      <Aside space="large">
        <div>
          <CharacterList />
        </div>
        <div>
          <DetailCard />
        </div>
      </Aside>
    </>
  );
};

export default App;
