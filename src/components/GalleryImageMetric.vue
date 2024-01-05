<script setup>
import { HeartIcon } from '@heroicons/vue/20/solid';

defineProps({
  likes: Number,
});
</script>

<template>
  <div class="image-metric">
    <HeartIcon />
    <span>{{ likes }}</span>
  </div>
</template>

<style lang="scss" scoped>
.image-metric {
  @include flex;
  @include align-items;
  gap: $spacing-xs;

  svg {
    width: 1.25rem;
    color: rgba($black, 0.3);
  }
}
</style>
