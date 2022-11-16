import { createContext, ReactNode, useContext, useState } from 'react';

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface People {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: Planet;
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
