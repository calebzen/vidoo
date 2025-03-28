<script setup lang="ts">

  const { vidSrc } = defineProps<{
    vidSrc: string;
  }>();
</script>

<template>
  <div class="size-full">
    <iframe :src="vidSrc" frameborder="0" referrerpolicy="origin" allowfullscreen
      class="w-full h-[600px] **:overflow-hidden">
    </iframe>
  </div>
</template>

<style scoped></style>