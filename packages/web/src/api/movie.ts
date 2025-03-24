import { request } from "../utils/request";

export default {
	popular: async (page: number = 1) => await request({ method: "GET", url: `/movie/popular?page=${page}` }),
	topRated: async (page: number = 1) => await request({ method: "GET", url: `/movie/top_rated`, params: { page } }),
	/**
	 * Get movie's trailer.
	 * @param movie_id
	 * @returns
	 */
	videos: async (movie_id: string) => await request({ method: "GET", url: `/movie/${movie_id}/videos` }),
};
