<script setup lang="ts">
  import { onMounted } from "vue";
  import Main from './Main.vue';

  const routeData = [
    { path: "movie", label: "MOVIE" }
  ];
  onMounted(() => {
  });
</script>

<template>
  <header class="w-full h-16 bg-base-100 backdrop-blur-md bg-opacity-90 sticky top-0 border-b border-base-200 z-50">
    <div class="size-full container flex justify-between items-center">
      <div class="flex gap-10 items-center flex-1">
        <div>
          <h3 class="text-heading">VIDOO</h3>
        </div>
        <ul class="menu menu-horizontal menu-sm bg-transparent p-0 [&_a]:rounded *:tracking-wide gap-2">
          <li v-for="route in routeData" :key="route.path">
            <RouterLink :to="route.path" active-class="active" class="py-1.5">
              <span>{{ route.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="flex items-center text-content">
        <button type="button" class="btn btn-sm btn-primary btn-text rounded">LOGIN</button>
      </div>
    </div>
  </header>
  <Main />
  <footer class="w-full h-20"></footer>
</template>

<style scoped></style>