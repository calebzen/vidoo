<script setup lang="ts">
  import HeroSection from 'src/components/HeroSection.vue';
  import { computed, onMounted, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import tv from 'api/tv';
  import splice from 'api/splice';
  import { formatVoteAverage, minutesToMinutesHours } from 'src/utils';
  import { ListPlus, Heart, MoveRight, ImageOff, Rocket, Crown, DollarSign, Vote, Clapperboard, Facebook } from 'lucide-vue-next';
  import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

  const route = useRoute();
  const seriesId = computed(() => {
    const id = route.params.id;
    return Array.isArray(id) ? id[0] : id;
  });
  const details = ref<any>();
  const credits = ref();
  const crewList = computed(() => {
    if (!credits.value) return;
    return credits.value.crew.slice(0, 10);
  });
  const crewListGrouped = computed<{ [key: string]: any[]; }>(() => {
    if (!credits.value) return;
    return credits.value.crew.reduce((acc, cur) => {
      const { job } = cur;
      if (!acc[job]) {
        acc[job] = [];
      }
      acc[job].push(cur);
      return acc;
    }, {});
  });
  const castList = computed(() => {
    if (!credits.value) return;
    // Doubt: Ordered?
    return credits.value.cast.sort((a, b) => a.order - b.order);
  });
  const externalIdList = ref<string[]>([]);
  const idIconMap = {
    facebook_id: {
      path: "/src/assets/images/facebook.png",
      class: "bg-[#0866FF]",
      href: "https://www.facebook.com/"
    },
    id: {
      path: "/src/assets/images/themoviedatabase.png",
      class: "bg-[#01B4E4]",
      href: "https://www.themoviedb.org/movie/"
    },
    imdb_id: {
      path: "/src/assets/images/imdb.png",
      class: "bg-[#F5C518]",
      href: "hhttps://www.imdb.com/title/tt"
    },
    instagram_id: {
      path: "/src/assets/images/instagram.png",
      class: "bg-[#FF0069]",
      href: "https://www.instagram.com/"
    },
    twitter_id: {
      path: "/src/assets/images/x.png",
      class: "",
      href: "https://twitter.com/"
    },
    wikidata_id: {
      path: "/src/assets/images/wikidata.png",
      class: 'bg-[#006699]',
      href: "https://wikidata.com/"
    },
  };
  const similarMovieList = ref<any[]>([]);
  const vidSrc = computed(() => `https://vidsrc.icu/embed/movie/${seriesId.value}`);
  const providers = ref<any>();

  const numFmt = new Intl.NumberFormat('en-US', {
    notation: "compact",
    compactDisplay: "short",
  });

  const dateFmt = new Intl.DateTimeFormat('en-US', {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  onMounted(async () => {
    details.value = await tv.details(seriesId.value);
    document.title = details.value.name;
    credits.value = await tv.credits(seriesId.value);
    const response = await tv.externalIds(seriesId.value);
    externalIdList.value = Object.keys(response).filter(id => response[id]);
    similarMovieList.value = (await tv.similar(seriesId.value)).results.slice(0, 5);
  });

</script>

<template>
  <div v-if="details" class="movie-details-page bg-base-100 relative -top-16 bg-cover bg-no-repeat">
    <HeroSection class="items-end pb-10"
      :style="{ backgroundImage: `url(${splice.imageUrl(details.backdrop_path, 1920)})` }">
      <template #left>
        <div class="absolute inset-0 bg-base-100/90"></div>
        <img :src="splice.imageUrl(details.poster_path)" alt="" class="rounded z-[1]">
      </template>
      <template #right>
        <div class="flex flex-col z-[1] p-8">
          <section class="base-info space-y-2">
            <div class="flex gap-2 items-center">
              <h3 class="text-heading text-3xl">
                {{ details.name }}
              </h3>
              <span class="text-meta px-1.5 py-0.5 bg-base-100 rounded">{{ details.origin_country[0] }}</span>
            </div>
            <div class="text-content space-x-2">
              <span>{{ details.number_of_episodes }}</span>
              <span class="relative before-dot">
                <span class="ml-3">{{ details.first_air_date }}</span>
              </span>
              <span class="before-dot relative">
                <span v-for="(tag, index) in details.genres" :key="tag.id" class="first:ml-3">{{ tag.name }}
                  <span v-if="index < details.genres.length - 1" class="mx-0.5">/</span>
                </span>
              </span>
            </div>
          </section>
          <div class="grow"></div>
          <section>
            <h3 class="text-heading">Overview</h3>
            <p class="line-clamp-3 text-description text-base first-letter:ml-4">
              {{ details.overview || "No Overview.." }}
            </p>
          </section>
          <section class="mt-4 space-x-4">
            <RouterLink :to="`/watch/tv/${seriesId}/1/1`" target="_blank">
              <button v-if="false" type="button"
                class="animated-btn relative btn btn-primary btn-soft text-content rounded mr-10 group overflow-hidden">
                <span class="absolute size-full bg-primary transition-all duration-300"
                  style="clip-path: circle(5% at 15% 50%); animation-timing-function: cubic-bezier(0.39, 0.01, 0.4, 1.68);"></span>
                <span class="ml-4 group-hover:opacity-0">Watch Now</span>
                <span
                  class="absolute ml-1 text-bg-primary bg-transparent translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-[1] flex items-center"
                  style="animation-timing-function: cubic-bezier(0.39, 0.01, 0.4, 1.68);">
                  Watch Now
                  <MoveRight :size="16" />
                </span>
              </button>
            </RouterLink>
            <button type="button" class="btn btn-secondary btn-soft btn-circle text-content rounded-full">
              <ListPlus class="ml-0.5" />
            </button>
            <button type="button" class="btn btn-secondary btn-soft btn-circle text-content rounded-full">
              <Heart class="mt-0.5" />
            </button>
            <button type="button"
              class="relative btn btn-secondary btn-soft text-content rounded-full mr-10 group overflow-hidden">
              Watch Trailer
            </button>
          </section>
        </div>
      </template>
    </HeroSection>
    <div class="sub-container mt-4 flex gap-4">
      <div class="grow overflow-hidden">
        <section id="section-crew">
          <h4 class="text-heading text-2xl py-2 uppercase">Crew</h4>
          <OverlayScrollbarsComponent class="pb-4">
            <div v-if="crewList
            " class="inline-flex flex-nowrap gap-4 w-full h-full bg-base-100 rounded">
              <div v-for="cast in crewList" :key="cast.id" class="inline-block flex-shrink-0 w-44 rounded">
                <div class="w-full h-64 flex justify-center items-center bg-base-200">
                  <img :src="splice.imageUrl(cast.profile_path)"
                    onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';"
                    class="rounded object-cover">
                  <ImageOff class="hidden size-8" />
                </div>
                <div class="grow h-16 flex flex-col gap-2 p-2 text-center">
                  <span class="text-content line-clamp-2">{{ cast.name }}</span>
                  <span class="text-description">{{ cast.job }}</span>
                </div>
              </div>
            </div>
          </OverlayScrollbarsComponent>
        </section>
        <section id="section-cast">
          <h4 class="text-heading text-2xl py-2 uppercase">Top Casts</h4>
          <OverlayScrollbarsComponent class="pb-4" :options="{ scrollbars: { autoHide: 'leave' } }">
            <div v-if="crewListGrouped
            " class="inline-flex flex-nowrap gap-4 w-full h-full bg-base-100 rounded">
              <div v-for="cast in castList" :key="cast.id" class="inline-block flex-shrink-0 w-44 rounded">
                <div class="w-full h-64 flex justify-center items-center bg-base-200">
                  <img :src="splice.imageUrl(cast.profile_path)"
                    onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='block';"
                    class="rounded object-cover">
                  <ImageOff class="hidden size-8" />
                </div>
                <div class="grow h-16 flex flex-col gap-2 p-2">
                  <span class="text-content line-clamp-2">{{ cast.name }}</span>
                  <span class="text-description">{{ cast.character }}</span>
                </div>
              </div>
            </div>
          </OverlayScrollbarsComponent>
        </section>
        <section id="section-similar">
          <h4 class="text-heading text-2xl py-2 uppercase">Similar</h4>
          <OverlayScrollbarsComponent class="pb-4" :options="{ scrollbars: { autoHide: 'leave' } }">
            <div v-if="!!similarMovieList.length" class="w-full flex gap-4">
              <div v-for="item in similarMovieList" class="inline-block flex-shrink-0 w-52">
                <RouterLink :to="`/movie/${item.id}`" target="_blank">
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
          </OverlayScrollbarsComponent>
        </section>
      </div>
      <div class="w-80 max-w-80">
        <section id="section-movie-stat">
          <h4 class="text-heading text-2xl py-2 uppercase">Stats</h4>
          <div class="stats shadow-none stats-vertical max-w-80 min-w-80">
            <div class="stat">
              <div class="stat-figure text-base-content size-8">
                <Clapperboard class="size-8" />
              </div>
              <div class="stat-title">{{ details.status }}</div>
              <div class="stat-value">{{ dateFmt.format(new Date(details.last_air_date)) }}</div>
              <a :href="details.homepage" target="_blank" class="stat-desc line-clamp-1">{{ details.homepage }}</a>
            </div>
            <div class="stat">
              <div class="stat-figure text-base-content size-8">
                <Crown class="size-8" />
              </div>
              <div class="stat-title">Popularity</div>
              <div class="stat-value">{{ numFmt.format(details.popularity) }}</div>
              <div class="stat-desc">You may like it</div>
            </div>
            <div class="stat">
              <div class="stat-figure text-base-content size-8">
                <Vote class="size-8" />
              </div>
              <div class="stat-title">Rating</div>
              <div class="stat-value">{{ details.vote_average }}</div>
              <div class="stat-desc">{{ numFmt.format(details.vote_count) }} people voted</div>
            </div>
          </div>
        </section>
        <section id="section-link">
          <h4 class="text-heading text-2xl py-2 uppercase">
            Links
          </h4>
          <div class="card">
            <ul class="menu">
              <li v-for="item in externalIdList.filter(i => idIconMap[i])" :key="item">
                <a :href="`${idIconMap[item].href}${details.id}`" target="_blank" class="gap-4">
                  <img :src="idIconMap[item].path" alt="" class="size-5" :class="idIconMap[item].class">
                  <span class="first-letter:uppercase text-content">{{ item === "id" ? "Tmdb" :
                    item.split("_")[0] }}</span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animated-btn:hover>span:first-child {
  clip-path: circle(100% at 50% 50%) !important;
}
</style>