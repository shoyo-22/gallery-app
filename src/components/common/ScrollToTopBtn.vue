<script setup>
import ArrowUpIcon from '@/components/icons/ArrowUpIcon.vue';
import { ref, onMounted, onUnmounted } from 'vue';

let showBtn = ref(false);

const handleScroll = () => {
  showBtn.value = window.scrollY > 100;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div v-if="showBtn" @click="scrollToTop" class="scrollToTopBtn">
    <ArrowUpIcon />
  </div>
</template>

<style lang="scss" scoped>
.scrollToTopBtn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: $spacing-lg;
  background-color: $white;
  border-radius: $radius-md;
  box-shadow: $shadow-default;
  cursor: pointer;

  svg {
    width: 1.25rem;
  }
}
</style>
