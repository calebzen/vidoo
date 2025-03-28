<script setup lang="ts">
  import discover from "api/discover";
  import splice from "api/splice";
  import genre from "api/genre";
  import { onMounted, onUnmounted, ref, shallowRef, useTemplateRef, watch } from "vue";
  import { MovieList } from "types";
  import { formatVoteAverage } from "src/utils";
  import { useIntersectionObserver } from '@vueuse/core';

  const list = ref<any[]>([]);
  const genreList = ref<MovieList>();
  const selection = ref<Set<number>>(new Set([]));
  const selectChange = shallowRef(false);
  const page = ref(1);
  const hasMore = shallowRef(true);
  const loaderRef = useTemplateRef<HTMLDivElement>('loader');
  const loaderVisible = shallowRef(true);
  const isLoading = shallowRef(false);

  const fetchDiscoverTV = async () => {
    isLoading.value = true;
    const response = await discover.tv({ include_adult: true, page: page.value, with_genres: [...selection.value].map(id => id).join(",") });
    list.value = response.results;
    hasMore.value = page.value < response.total_pages;
    isLoading.value = false;
  };

  const loadMore = async () => {
    isLoading.value = true;
    const response = await discover.tv({ include_adult: true, page: page.value, with_genres: [...selection.value].map(id => id).join(",") });
    list.value.push(...response.results);
    isLoading.value = false;
  };

  const { stop } = useIntersectionObserver(loaderRef, ([entry]) => {
    loaderVisible.value = entry.isIntersecting || false;
  });

  watch(loaderVisible, () => {
    if (loaderVisible.value && !isLoading.value) {
      page.value += 1;
      loadMore();
    }
  });

  // Change by genre selected.
  watch(() => Array.from(selection.value), (newValue, oldValue) => {
    if (newValue !== oldValue) {
      selectChange.value = true;
      page.value = 1;
      fetchDiscoverTV().finally(() => selectChange.value = false);
    }
  });

  onMounted(async () => {
    genreList.value = await genre.tvList();
    await fetchDiscoverTV();
  });

  onUnmounted(() => {
    stop();
  })

</script>

<template>
  <div class="movie-page sub-container bg-base-100 pt-4 mt-16">
    <div class="tool-bar w-full h-full bg-inherit">
      <div class="filter-category flex items-start gap-4">
        <div class="uppercase flex text-heading text-nowrap">
          GENRES
        </div>
        <div v-if="genreList && !!genreList.genres.length" class="flex flex-wrap gap-1 grow">
          <input type="checkbox" name="category-checkbox" v-for="cate in genreList.genres"
            class="btn btn-sm btn-text rounded text-description" :aria-label="cate.name"
            :checked="selection.has(cate.id)"
            @click="() => selection.has(cate.id) ? selection.delete(cate.id) : selection.add(cate.id)" />
          <input type="reset" value="reset" class="btn btn-sm btn-primary btn-soft text-description ml-auto"
            @click="() => selection.clear()">
        </div>
      </div>
    </div>
    <div class="divider my-4"></div>
    <div v-if="list && !!list.length" class="w-full flex flex-wrap gap-4 justify-center">
      <div class="inline-flex flex-wrap gap-4 justify-center">
        <div v-for="item in list" class="inline-block flex-shrink-0 w-52">
          <RouterLink :to="`tv/${item.id}`" target="_blank">
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
          <div v-if="selectChange" class="fixed inset-0 bg-base-200/10 flex justify-center items-center">
            <span class="loading size-10"></span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="skeleton-container w-full inline-flex flex-wrap gap-4 justify-center">
      <div v-for="_ in Array.from({ length: 10 })" class="flex flex-col h-96 w-52 min-w-52 gap-4">
        <div class="skeleton skeleton-animated h-80 w-full"></div>
        <div class="skeleton skeleton-animated h-3 w-full"></div>
        <div class="flex items-center gap-4">
          <div class="skeleton skeleton-animated h-2 w-3/5"></div>
          <div class="skeleton skeleton-animated h-2 grow"></div>
        </div>
      </div>
    </div>
    <div ref="loader" v-show="hasMore" class="loader w-full flex flex-col justify-center items-center gap-4 py-10 mt-4">
      <span class="loading size-10"></span>
    </div>
  </div>
</template>

<style scoped></style>