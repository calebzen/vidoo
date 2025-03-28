import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

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
        component: () => import("../views/movie/index.vue"),
      },
      {
        path: "tv",
        component: () => import("../views/tv/index.vue"),
      },
      {
        path: "movie/:id",
        component: () => import("../views/movie/detail/index.vue"),
      },
      {
        path: "tv/:id",
        component: () => import("../views/tv/details/index.vue"),
      },
      {
        path: "/watch/:type/:id/:season?/:episode?",
        component: () => import("../views/watch/index.vue"),
      },
      {
        path: "/login",
        component: () => import("../views/login/index.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to) => {
    if (to.fullPath !== "/") {
      return {
        top: 0,
        left: 0,
      };
    }
  },
});

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100);
});

export default router;
