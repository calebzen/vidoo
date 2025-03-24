<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import movie from 'api/movie';
  import config from 'api/configuration';

  const movies = ref([]);
  const baseUrl = ref();

  onMounted(async () => {
    const details = await config.details();
    baseUrl.value = details.images.base_url;
    movies.value = await movie.popular();
  });

</script>

<template>
  <div>
    <div class="container md:px-10 lg:px-20 mt-4">
      <h3 class="text-heading py-2">POPULAR</h3>
      <div class="w-full h-96 overflow-x-auto flex flex-row horizontal-scrollbar">
        <div v-for="(item, index) in movies.results" :key="index" class="w-80 h-full flex-shrink-0">
          <img :src="`${baseUrl}w500${item.poster_path}`" alt="" class="rounded">
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>