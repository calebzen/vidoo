<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import movie from 'api/movie';
  import splice from 'api/splice';
  import { useRoute } from 'vue-router';
  import tv from 'api/tv';

  const route = useRoute();
  const details = ref();
  const watchTye = computed(() => {
    const type = route.params.type;
    return Array.isArray(type) ? type[0] : type;
  });
  const watchId = computed(() => {
    const id = route.params.id;
    return Array.isArray(id) ? id[0] : id;
  });
  const season = computed(() => {
    const _season = route.params.season;
    return Array.isArray(_season) ? _season[0] : _season;
  });
  const episode = computed(() => {
    const _episode = route.params.episode;
    return Array.isArray(_episode) ? _episode[0] : _episode;
  });
  const backdropUrl = computed(() => {
    if (!details.value) return;
    return splice.imageUrl(details.value.backdrop_path, 1920);
  });
  // https://vidsrc.xyz/embed/tv?tmdb=1399&season=1&episode=1
  const vidSrc = computed(() => {
    if (watchTye.value === 'movie') {
      return `https://vidsrc.me/embed/movie?tmdb=${watchId.value}`;
    } else if (watchTye.value === 'tv') {
      return `https://vidsrc.to/embed/tv/${watchId.value}/${season}/${episode}`;
    }
  });

  onMounted(async () => {
    if (watchTye.value === 'movie') {
      details.value = await movie.details(watchId.value!);
    } else if (watchTye.value === 'tv') {
      details.value = await tv.details(watchId.value);
    }
    document.title = `Watch | ${details.value.title || details.value.name}`;
  });
</script>

<template>
  <div class="fixed inset-0 size-full bg-cover bg-no-repeat z-[1]" :style="{ backgroundImage: `url(${backdropUrl})` }">
    <div class="fixed size-full bg-base-300/80"></div>
  </div>
  <div v-if="details" class="sub-container h-full flex flex-col gap-4 p-4">
    <div v-if="watchTye === 'movie'" class="watch-page size-full bg-inherit relative top-16 z-20 flex flex-col gap-2">
      <h3 class="text-heading text-2xl">{{ details.title }}</h3>
      <div class="grow w-full rounded">
        <iframe :src="vidSrc" frameborder="0" referrerpolicy="origin" allowfullscreen
          class="size-full rounded"></iframe>
      </div>
    </div>
    <div v-if="watchTye === 'tv'" class="watch-page size-full bg-inherit relative top-16 z-20 flex flex-col gap-2">
      <h3 class="text-heading text-2xl">{{ details.name }}</h3>
      <div class="grow w-full rounded">
        <iframe :src="vidSrc" frameborder="0" referrerpolicy="origin" allowfullscreen
          class="size-full rounded"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped></style>