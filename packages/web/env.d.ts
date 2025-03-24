/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	const vueComponent: DefineComponent<{}, {}, any>;
	export default vueComponent;
}

interface ImportMetaEnv {
	VITE_TMDB_API_KEY: string;
}
