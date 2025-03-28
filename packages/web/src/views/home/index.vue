<script setup lang="ts">
  import { onActivated, onMounted, provide, ref } from "vue";
  import movie from 'api/movie';
  import trending from 'api/trending';
  import splice from "api/splice";
  import genre from "api/genre";
  import type { Genre, Movie, TrendingAll, ResponseWithPage } from "types";
  import HeroSection from "src/components/HeroSection.vue";
  import { formatVoteAverage } from "src/utils";
  import { onBeforeRouteLeave } from "vue-router";
  import { PROVIDE } from "src/constants";
  import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

  const popularMovieList = ref<ResponseWithPage<Movie[]>>();
  const trendingList = ref<TrendingAll>();
  const trendTime = ref<"day" | "week">("day");
  const currentTab = ref('今日');
  const genreList = ref<Genre[]>([]);
  const scrollRef = ref<HTMLDivElement | null>(null);
  const scrollTop = ref(0);
  const trailerList = ref<any>([]);

  provide(PROVIDE.GENRE_LIST, genreList);

  onMounted(async () => {
    scrollRef.value = document.querySelector("[data-overlayscrollbars-contents]");
    popularMovieList.value = await movie.popular();
    trendingList.value = await trending.all(trendTime.value);
    const movieList = await genre.movieList();
    if (movieList) {
      genreList.value = movieList.genres;
    }
  });

  onBeforeRouteLeave((to, from, next) => {
    scrollTop.value = scrollRef.value?.scrollTop ?? 0;
    next();
  });

  onActivated(() => {
    if (!scrollRef.value) return;
    scrollRef.value.scrollTop = scrollTop.value;
  })

</script>

<template>
  <div class="home-page w-full h-auto bg-inherit relative -top-16">
    <HeroSection class="bg-[url(/src/assets/alita.png)]" id="home-hero-section">
      <template #left>
        <div class="flex flex-col justify-center ml-20">
          <h3
            class="banner-title bg-gradient-to-r from-primary to-error bg-clip-text text-transparent font-black text-4xl w-fit opacity-0 uppercase">
            Vidoo
          </h3>
          <p class="banner-description mt-md text-heading text-2xl opacity-0">
            New Dimension of Vision
          </p>
        </div>
      </template>
    </HeroSection>

    <div class="home-body bg-base-100 w-full relative">
      <div class="sub-container mt-4 px-4 2xl:px-0 space-y-4">
        <section id="section-trend">
          <h4 class="text-heading text-2xl uppercase py-2">Trending</h4>
          <OverlayScrollbarsComponent class="pb-4 px-2 rounded">
            <div v-if="trendingList && !!trendingList.results.length" class="w-full flex gap-4">
              <div v-for="item in trendingList?.results" class="inline-block flex-shrink-0 w-52">
                <RouterLink :to="`${item.media_type}/${item.id}`" target="_blank">
                  <div class="flex flex-col h-full cursor-pointer relative">
                    <img :src="splice.imageUrl(item.poster_path)" class="w-full h-80 bg-inherit rounded">
                    <div class="mt-1 flex flex-col justify-between">
                      <h3 class="text-heading line-clamp-1">{{ item.name || item.title }}</h3>
                      <div class="text-description flex justify-between items-center">
                        <span>{{ item.release_date || item.first_air_date }}</span>
                        <span>{{ formatVoteAverage(item.vote_average) }}</span>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
            <div v-else class="skeleton-container w-full flex gap-4">
              <div v-for="_ in Array.from({ length: 10 })" class="flex flex-col h-96 w-52 min-w-52 gap-4">
                <div class="skeleton skeleton-animated h-80 w-full"></div>
                <div class="skeleton skeleton-animated h-3 w-full"></div>
                <div class="flex items-center gap-4">
                  <div class="skeleton skeleton-animated h-2 w-3/5"></div>
                  <div class="skeleton skeleton-animated h-2 grow"></div>
                </div>
              </div>
            </div>
          </OverlayScrollbarsComponent>
        </section>
        <section id="section-popular">
          <h4 class="text-heading text-2xl uppercase py-2">Popular</h4>
          <OverlayScrollbarsComponent class="pb-4 px-2 rounded">
            <div v-if="popularMovieList && !!popularMovieList.results.length" class="w-full flex gap-4">
              <div v-for="item in popularMovieList.results" class="inline-block flex-shrink-0 w-52">
                <RouterLink :to="`movie/${item.id}`">
                  <div class="flex flex-col h-full cursor-pointer relative">
                    <img :src="splice.imageUrl(item.poster_path)" class="w-full h-80 bg-inherit rounded">
                    <div class="mt-1 flex flex-col justify-between">
                      <h3 class="text-heading line-clamp-1">{{ item.title }}</h3>
                      <div class="text-description flex justify-between items-center">
                        <span>{{ item.release_date }}</span>
                        <span>{{ formatVoteAverage(item.vote_average) }}</span>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
            <div v-else class="skeleton-container w-full flex gap-4">
              <div v-for="_ in Array.from({ length: 10 })" class="flex flex-col h-96 w-52 min-w-52 gap-4">
                <div class="skeleton skeleton-animated h-80 w-full"></div>
                <div class="skeleton skeleton-animated h-3 w-full"></div>
                <div class="flex items-center gap-4">
                  <div class="skeleton skeleton-animated h-2 w-3/5"></div>
                  <div class="skeleton skeleton-animated h-2 grow"></div>
                </div>
              </div>
            </div>
          </OverlayScrollbarsComponent>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateY(200%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.banner-title {
  animation: slideIn 0.5s ease-in-out forwards;
}

.banner-description {
  animation: slideIn 0.5s 0.3s ease-in-out forwards;
}

.category-dot {
  clip-path: polygon(30% 40%, 35% 40%, 30% 60%, 25% 60%);
}
</style>