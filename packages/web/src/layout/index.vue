<script setup lang="ts">

  import { Menu, X } from 'lucide-vue-next';
  import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
  import ModalLayout from 'src/components/modal/ModalLayout.vue';
  import { computed, onMounted, onUnmounted, ref, shallowRef, useTemplateRef, watch } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const menuList = [
    { label: "movie", href: "/movie" },
    { label: "tv series", href: "/tv" },
    // { label: "login", href: "/login" },
  ];
  const visible = ref(true);
  const isHome = ref(route.path === '/');
  let ob: IntersectionObserver | null = null;
  const open = ref(false);

  const setupObserver = () => {
    const homeHeroSection = document.getElementById("home-hero-section");
    if (!homeHeroSection) return;

    if (ob) ob.disconnect();
    ob = new IntersectionObserver(([entry]) => {
      visible.value = entry.isIntersecting;
    }, { rootMargin: "-64px" });

    ob.observe(homeHeroSection);
  };

  onMounted(() => {
    setupObserver();
  });

  onUnmounted(() => {
    if (ob) ob.disconnect();
    ob = null;
    visible.value = false;
  });

  watch(() => route.path, () => {
    isHome.value = route.path === "/";
    setTimeout(() => {
      setupObserver();
    }, 100);
  });

  const modalRef = ref<InstanceType<typeof ModalLayout> | null>(null);
</script>

<template>
  <OverlayScrollbarsComponent class="size-full" :options="{ scrollbars: { autoHide: 'scroll' } }">
    <header :class="{ 'bg-transparent backdrop-blur-none border-transparent': visible && isHome }"
      class="md:flex w-full md:px-4 fixed top-0 z-50 border-b border-base-200/50 backdrop-blur-lg bg-base-200/50 transition-all duration-200">
      <nav class="w-full md:w-fit min-h-16 flex items-center">
        <div class="flex w-full h-auto justify-between items-center px-2">
          <RouterLink to="/">
            <h3
              class="bg-gradient-to-r from-primary to-error bg-clip-text text-transparent text-heading text-2xl uppercase">
              vidoo
            </h3>
          </RouterLink>
          <button ref="collapse-toggle" type="button"
            class="flex md:hidden collapse-toggle btn btn-primary btn-square btn-text" id="navbar-collapse-toggle"
            data-collapse="#navbar-collapse" aria-expanded="false" aria-controls="navbar-collapse">
            <Menu />
          </button>
        </div>
      </nav>
      <div id="navbar-collapse"
        class="md:navbar-end md:grow collapse hidden w-full overflow-hidden transition-[height] duration-300 has-[.active]:[&_.active>div]:after:opacity-100"
        aria-labelledby="basic-collapse">
        <div id="collapse-overlay" class="hidden collapse-open:block fixed inset-0 h-screen top-16 bg-base-200/90">
        </div>
        <ul class="menu md:menu-horizontal md:p-0 bg-transparent gap-2 hover:[&_a]:bg-transparent items-center">
          <li v-for="menu in menuList" :key="menu.label">
            <RouterLink :to="menu.href" active-class="active"
              class="p-0 active:bg-transparent! text-content! place-content-center flex md:block">
              <div
                class="menu-item relative w-full md:w-24 h-10 bg-inherit leading-10 uppercase after:absolute after:content-[''] after:h-0.5 after:inset-x-0 after:bottom-0 after:bg-info after:opacity-0 cursor-pointer select-none hover:after:opacity-100 after:transition-opacity after:duration-200">
                <span class="line-clamp-1 text-center">{{ menu.label }}</span>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </header>
    <main class="outlet grow h-auto">
      <RouterView v-slot="{ Component }">
        <Transition name="slide-fade">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </main>
    <footer class="w-full bg-base-100 h-20">
      <div class="text-center text-description p-4">
        Build with TMDB .
      </div>
    </footer>
  </OverlayScrollbarsComponent>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.8s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>