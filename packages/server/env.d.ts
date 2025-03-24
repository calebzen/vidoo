declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		API_READ_ACCESS_TOKEN: string;
		API_KEY: string;
		http_proxy: string;
	}
}
