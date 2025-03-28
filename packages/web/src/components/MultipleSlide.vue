<script setup lang="ts">
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';
  import 'swiper/css/navigation';

  const modules = ref([Navigation, Mousewheel, Keyboard]);


  const { list } = defineProps<{
    list: any;
  }>();

</script>

<template>
  <Swiper :slidesPerView="5.5" :spaceBetween="16" :cssMode="true" :navigation="true" :mousewheel="true" :keyboard="true"
    :modules="modules" class="w-full h-full">
    <SwiperSlide v-for="(item, index) in list" :key="index" class="bg-base-100 h-96 rounded">
      <slot :item="item"></slot>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped></style>