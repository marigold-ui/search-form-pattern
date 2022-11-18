export const getIdFromUrl = (url: string) => {
  const matches = url.match(/(?<id>\d+)\/$/);

  if (!matches) {
    throw Error('No match');
  }

  return Number(matches?.groups!.id);
};

// get id from swapi Urls
// didn't find an id in url (https://swapi.py4e.com/api/films/)
