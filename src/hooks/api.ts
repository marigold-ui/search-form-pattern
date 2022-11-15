import { useParams } from 'react-router';

export const fetchPlanet = (url: string) => fetch(url).then(res => res.json());

export const getIdFromUrl = (url: string) => {
  const { id } = useParams();
  return id;
};

export const get = async <T = unknown>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
