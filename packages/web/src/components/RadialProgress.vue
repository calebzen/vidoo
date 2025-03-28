<script setup lang="ts">
  import { computed } from 'vue';

  const { percentage } = defineProps<{ percentage: number; }>();

  const strokeWidth = 4;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = computed(() => {
    const clampedPercentage = Math.min(100, Math.max(0, percentage));
    return circumference * (1 - clampedPercentage / 100);
  });

  const progressBarColor = computed(() => {
    if (percentage < 30) {
      return "text-secondary";
    } else if (percentage < 60) {
      return "text-warning";
    } else {
      return "text-success";
    }
  });

</script>

<template>
  <svg class="size-11 bg-info rounded-full flex! justify-center items-center" viewBox="0 0 50 50">
    <circle class="text-info" stroke="currentColor" fill="transparent" :stroke-width="strokeWidth" cx="25" cy="25"
      r="20" />
    <circle class="transition-all duration-300" :class="progressBarColor" stroke="currentColor" fill="transparent"
      :stroke-width="strokeWidth" stroke-linecap="round" cx="25" cy="25" r="20" :stroke-dasharray="circumference"
      :stroke-dashoffset="strokeDashoffset" transform="rotate(-90 25 25)" />
    <text x="50%" y="50%" text-anchor="middle" dy="0.4em" class="text-meta">
      {{ percentage }}%
    </text>
  </svg>
</template>

<style scoped>
svg {
  display: block;
}

text {
  fill: white !important;
}
</style>