import axios from "axios";

interface RequestOption {
	url?: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	params?: { [key: string]: any };
	data?: { [key: string]: any };
}

export const request = async (options: RequestOption) => {
	const instance = axios.create({
		baseURL: "https://api.themoviedb.org/3",
		headers: {
			accept: "application/json",
		},
		params: {
			language: "zh-CN",
			api_key: import.meta.env.VITE_TMDB_API_KEY,
		},
	});

	try {
		return (await instance.request({ ...options })).data;
	} catch (err) {
		return {
			status: "INTERVAL_ERROR",
			err,
		};
	}
};
