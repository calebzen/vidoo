import { request } from "src/utils/request";
import type { MovieList } from "types";

export default {
  movieList: async () =>
    await request<MovieList>({
      method: "GET",
      url: `genre/movie/list`,
    }),

  tvList: async () =>
    await request({
      method: "GET",
      url: `/genre/tv/list`,
    }),
};
