export const getJson = async <T = unknown>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (e) {
    throw Error(e.message);
  }
};
