<script setup lang="ts">
  import { inject, onMounted, ref } from 'vue';

  const props = defineProps<{ name: string; }>();
  const activeTab = inject('activeTab', ref(''));
  const registerTab = inject<(name: string) => void>('registerTab');

  onMounted(() => {
    registerTab?.(props.name);
  });
</script>

<template>
  <div v-show="activeTab === name" class="size-full">
    <slot></slot>
  </div>
</template>
