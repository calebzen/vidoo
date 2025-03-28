<script setup lang="ts">
  import { ref, provide, inject, onMounted, watch } from 'vue';

  const props = defineProps<{ activeTab?: string; }>();
  const emit = defineEmits(['update:activeTab']);

  const activeTab = ref(props.activeTab || '');
  const tabs = ref<string[]>([]);
  const tabRefs = ref<HTMLElement[]>([]);

  provide('activeTab', activeTab);
  provide('registerTab', (name: string) => {
    if (!tabs.value.includes(name)) {
      tabs.value.push(name);
    }
  });

  const selectTab = (tab: string) => {
    activeTab.value = tab;
    emit('update:activeTab', tab);
  };

  const activeStyle = ref({ left: '0px', width: '0px' });

  const updateUnderlineStyle = (newTab: string) => {
    const activeIndex = tabs.value.indexOf(newTab);
    requestAnimationFrame(() => {
      if (tabRefs.value[activeIndex]) {
        const tab = tabRefs.value[activeIndex];
        activeStyle.value = {
          left: `${tab.offsetLeft}px`,
          width: `${tab.offsetWidth}px`,
        };
      }
    });
  };

  watch(activeTab, (newTab) => {
    updateUnderlineStyle(newTab);
  });

  onMounted(() => {
    if (activeTab.value && tabRefs.value) {
      updateUnderlineStyle(activeTab.value);
    }
  });
</script>

<template>
  <div class="tabs-container w-full">
    <div class="tab-header flex items-center gap-4">
      <div class="tab-controls bg-base-200 rounded w-fit p-1.5 flex">
        <div class="px-2 text-2xl">
          <slot name="title"></slot>
        </div>
        <div class="relative flex gap-2">
          <button v-for="tab in tabs" :key="tab" ref="tabRefs" @click="selectTab(tab)"
            class="px-4 py-1 cursor-pointer rounded z-[1]" :class="{ active: tab === activeTab }">
            <span class="z-[1] text-content uppercase">{{ tab }}</span>
          </button>
          <div class="absolute h-full bg-primary rounded transition-all duration-300 ease-in-out" :style="activeStyle">
          </div>
        </div>
      </div>
    </div>
    <div class="tab-content mt-4">
      <slot :active-tab="activeTab"></slot>
    </div>
  </div>
</template>

<style scoped></style>
