<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";

  const images = ref<string[]>([]);
  const activeIndex = ref(0);

  // 获取图片列表
  const getImages = () => [
    "/src/assets/spring.jpg",
    "/src/assets/summer.jpg",
    "/src/assets/fall.jpg",
    "/src/assets/winter.jpg",
    "/src/assets/mo.jpg"
  ];

  // 计算小图列表（不包含当前激活的大图）
  const thumbnailImages = computed(() => images.value.slice(1));

  // 处理点击小图
  const handleClick = (index: number) => {
    if (index === 0) return; // 直接点击大图不做处理

    // 判断是点击了前一张还是后一张
    if (index > activeIndex.value) {
      // 点击的是后面的图（右侧），当前大图移动到队尾
      images.value.push(images.value.shift() as string);
    } else {
      // 点击的是前面的图（左侧），当前大图移动到队头
      images.value.unshift(images.value.pop() as string);
    }

    // 重新设置激活索引
    activeIndex.value = 0;
  };

  // 初始化图片列表
  onMounted(() => {
    images.value = getImages();
  });
</script>

<template>
  <div class="recommend w-full h-[500px] bg-base-200 relative overflow-hidden">
    <!-- 大图区域 -->
    <div class="main-image-container w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <transition name="fade-scale" mode="out-in">
        <img v-if="images.length" :key="activeIndex" :src="images[0]"
          class="main-image w-full h-full object-cover rounded-lg" />
      </transition>
    </div>

    <!-- 右下角小图列表 -->
    <div class="thumbnail-container absolute bottom-4 right-4 flex gap-2">
      <transition-group name="move-scale">
        <div v-for="(item, index) in thumbnailImages" :key="item" @click="handleClick(index + 1)"
          class="thumbnail w-16 h-16 overflow-hidden rounded-lg cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-white">
          <img :src="item" class="w-full h-full object-cover">
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>

  /* 大图切换：放大 & 淡入 */
  .fade-scale-enter-active,
  .fade-scale-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .fade-scale-enter-from {
    opacity: 0;
    transform: scale(1.2);
  }

  .fade-scale-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  /* 小图列表：移动 + 缩放 */
  .move-scale-enter-active,
  .move-scale-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .move-scale-enter-from {
    transform: translateX(30px) scale(0.5);
    opacity: 0;
  }

  .move-scale-leave-to {
    transform: translateX(-30px) scale(0.5);
    opacity: 0;
  }

  .thumbnail img {
    transition: transform 0.3s ease;
  }

  .thumbnail:hover img {
    transform: scale(1.1);
  }
</style>
