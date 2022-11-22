export const getIdFromUrl = (url: string) => {
  const matches = url.match(/(?<id>\d+)\/$/);

  if (!matches) {
    throw Error('No match');
  }

  return Number(matches?.groups!.id);
};
