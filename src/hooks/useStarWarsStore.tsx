import { createContext, ReactNode, useContext, useState } from 'react';

export interface People {
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

export interface StarWarsStoreContext {
  setPeople: (people: People[]) => void;
  people: People[];
}

const Context = createContext<StarWarsStoreContext>({
  people: [],
  setPeople: () => {
    throw Error('Add the Provider!');
  },
});

export interface StarWarsStoreProviderProps {
  children: ReactNode;
}

export const StarWarsStoreProvider = ({
  children,
}: StarWarsStoreProviderProps) => {
  const [people, setPeople] = useState<People[]>([]);

  return (
    <Context.Provider value={{ people, setPeople }}>
      {children}
    </Context.Provider>
  );
};

export const useStarWarsStore = () => useContext(Context);
