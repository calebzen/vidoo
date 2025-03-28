export default {
  imageUrl: (path: string, w?: number) =>
    `http://image.tmdb.org/t/p/w${w || 500}${path}`,
  videoUrl: (movieId: number) => `https://vidsrc.icu/embed/movie/${movieId}`,
};
