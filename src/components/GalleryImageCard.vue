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
    <div class="image-card__image-container">
      <img
        :src="photoInfo.urls.regular"
        :alt="photoInfo.description || photoInfo.alt_description"
        loading="lazy"
        class="image-card__image"
      />
    </div>
    <div class="image-card__body">
      <GalleryImageMetric :likes="photoInfo.likes" />
      <GalleryImageAuthor :author="photoInfo.user" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.image-card {
  border-radius: $radius-md;

  &__image-container {
    @extend .image-card;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
    cursor: pointer;

    &:hover img {
      transform: scale(1.1);
      transform-origin: 50% 50%;
    }
  }

  &__image {
    @extend .image-card;
    width: inherit;
    height: inherit;
    object-fit: cover;
    transition: transform 300ms;
  }

  &__body {
    padding: $spacing-md;
    @include flex;
    @include justify-content;
  }
}
</style>
