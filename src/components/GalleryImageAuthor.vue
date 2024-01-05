<script setup>
defineProps({
  author: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="image-author">
    <img
      class="image-author__image"
      :src="author.profile_image.small"
      :alt="author.name"
      loading="lazy"
    />
    <span class="image-author__name">{{ author.name }}</span>
  </div>
</template>

<style lang="scss" scoped>
.image-author {
  @include flex;
  @include align-items;
  gap: $spacing-xs;

  &__image {
    border: 1px solid $white;
    border-radius: $radius-md;
  }
}
</style>
