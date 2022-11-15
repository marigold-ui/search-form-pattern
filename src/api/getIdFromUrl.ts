export const getIdFromUrl = (url: string) => {
  const matches = url.match(/(?<id>\d+)\/$/);

  if (!matches) {
    throw Error('BADJ KJLAÖKJDLÖKÖL');
  }

  return Number(matches?.groups!.id);
};
