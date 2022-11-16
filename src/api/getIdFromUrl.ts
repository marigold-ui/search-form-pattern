export const getIdFromUrl = (url: string) => {
  const matches = url.match(/(?<id>\d+)\/$/);

  if (!matches || undefined) {
    throw Error('No match');
  }

  return Number(matches?.groups!.id);
};
