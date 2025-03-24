import { request } from "../utils/request";

export default {
	details: async () => await request({ method: "GET", url: `/configuration` }),
};
