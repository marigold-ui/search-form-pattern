import { createContext, ReactNode, useContext, useState } from 'react';

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  species: string[];
  starships: string[];
  vehicles: string[];
  characters: string[];
  planets: string[];
  url: string;
  created: Date;
  edited: Date;
}

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

export interface PeopleResponse {
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
  films: Film[];
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
