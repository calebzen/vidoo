import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: () => import("../layout/index.vue"),
		children: [
			{
				path: "",
				component: () => import("../views/home/index.vue"),
			},
      {
        path: "movie",
        component: () => import("../views/movie/index.vue")
      }
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
