export const sliceImgUrl = (path: string, w?: number) => {
  const baseUrl = `http://image.tmdb.org/t/p/w${w || 500}`;
  return baseUrl + `${path}`;
};
