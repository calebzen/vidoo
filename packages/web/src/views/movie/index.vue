<script setup lang="ts">
  import discover from "api/discover";
  import movie from "api/movie";
  import { onMounted, ref } from "vue";
  import { sliceImgUrl } from '../../utils/sliceImgUrl';

  const list = ref([]);

  const handleClick = async (movie_id: string) => {
    await movie.videos(movie_id).then(r => console.log(r));
  };


  onMounted(async () => {
    list.value = await discover.movie(false);
  });

</script>

<template>
  <div class="movie-page bg-base-100 mt-2">
    <div class="container md:px-10 lg:px-20 flex flex-row gap-2">
      <div class="left w-64 min-w-64 h-96 bg-base-200 sticky top-16">movie</div>
      <div class="right grow bg-inherit grid grid-cols-4 gap-4">
        <div v-for="item in list.results" :key="item.id" class="relative rounded cursor-pointer group overflow-hidden"
          @click="() => handleClick(item.id)">
          <img :src="sliceImgUrl(item.poster_path)" alt=""
            class="rounded object-cover size-full group-hover:scale-105 transition-transform duration-200">
          <div
            class="absolute left-0 right-0 bottom-0 w-full h-16 bg-base-200 bg-opacity-50 backdrop-blur-md p-2 flex flex-col justify-between rounded-bl rounded-br">
            <span class="text-content line-clamp-1">{{ item.title }}</span>
            <span class="text-meta line-clamp-1">{{ item.release_date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>