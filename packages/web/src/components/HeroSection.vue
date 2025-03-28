<script setup lang="ts">

</script>

<template>
  <div class="hero-section w-full h-[600px] bg-base-100 bg-cover bg-no-repeat flex items-center relative">
    <div class="w-7xl max-w-7xl mx-auto h-96 bg-transparent flex gap-8">
      <slot name="left"></slot>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped></style>