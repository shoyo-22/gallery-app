<script setup>
import GalleryImageAuthor from './GalleryImageAuthor.vue';
import GalleryImageMetric from './GalleryImageMetric.vue';

defineProps({
  photoInfo: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="image-card">
    <img
      :src="photoInfo.urls.regular"
      :alt="photoInfo.description || photoInfo.alt_description"
      loading="lazy"
      class="image-card__image"
    />
    <div class="image-card__body">
      <GalleryImageMetric :likes="photoInfo.likes" />
      <GalleryImageAuthor :author="photoInfo.user" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.image-card {
  border-radius: $radius-md;

  &__image {
    @extend .image-card;
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  &__body {
    padding: $spacing-xxs $spacing-md;
    @include flex;
    @include justify-content;
  }
}
</style>
