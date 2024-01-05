<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import GalleryImageAuthor from '@/components/GalleryImageAuthor.vue';

const props = defineProps({
  id: String,
});

let photoInfo = ref({});

onBeforeMount(() => {
  getImageDetails();
});

async function getImageDetails() {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/${props.id}?client_id=${import.meta.env.VITE_ACCESS_KEY}`,
    );
    photoInfo.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <main>
    <div class="image-overlay">
      <img :src="photoInfo.urls.full" alt="" />
    </div>
    <section class="image-details">
      <header class="image-details__header">
        <GalleryImageAuthor :author="photoInfo.user" />
      </header>
      <div class="image-container">
        <img :src="photoInfo.urls.raw" alt="" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.image-overlay {
  position: absolute;
  width: 100%;
  height: 70vh;
  background: rgba($black, 0.5);
  z-index: -1;

  img {
    height: inherit;
    width: inherit;
    background-position: center;
    object-fit: cover;
    z-index: inherit;
    filter: blur(4px) grayscale(1);
  }
}

.image-details {
  @include container;
  padding: $spacing-xl;
  @include flex;
  @include flex-direction(column);
  gap: $spacing-5xl;

  &__header {
    margin-top: $spacing-5xl;
  }
}

.image-container {
  img {
    border-radius: $radius-md;
  }
}
</style>
