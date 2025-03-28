import { request } from "../utils/request";

export default {
  movie: async (includeAdult?: boolean, page?: number, with_genres?: string) =>
    await request({
      method: "GET",
      url: `/discover/movie`,
      params: { include_adult: includeAdult, page, with_genres },
    }),

  tv: async (params: { include_adult; page?; with_genres }) =>
    await request({ method: "GET", url: "/discover/tv", params }),
};
