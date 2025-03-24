import { request } from "../utils/request";

export default {
	movie: async (include_adult?: boolean) =>
		await request({ method: "GET", url: `/discover/movie`, params: { include_adult } }),
};
