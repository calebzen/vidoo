import { request } from "../utils/request";

export default {
	airingToday: async (page = 1) => await request({ method: "GET", url: `/tv/airing_today`, params: { page } }),
};
