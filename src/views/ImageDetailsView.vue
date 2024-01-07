<script setup>
import { onBeforeMount, ref } from 'vue';
import GalleryImageAuthor from '@/components/GalleryImageAuthor.vue';
import api from '@/config/api';
import BaseLoader from '@/components/common/BaseLoader.vue';
import HeartIcon from '@/components/icons/HeartIcon.vue';

const props = defineProps({
  id: String,
});

let photoInfo = ref({});
let loading = ref(false);

onBeforeMount(() => {
  getImageDetails();
});

async function getImageDetails() {
  loading.value = true;

  try {
    const response = await api.get(`/photos/${props.id}`);
    photoInfo.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function toDataURL(url) {
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return window.URL.createObjectURL(blob);
    });
}

async function downloadImage() {
  const a = document.createElement('a');
  a.href = await toDataURL(photoInfo.value.urls.full);
  a.download = `photo-${props.id}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>

<template>
  <BaseLoader v-if="loading" />
  <main v-else>
    <div class="image-overlay">
      <img :src="photoInfo.urls.full" alt="" />
    </div>
    <section class="image-details">
      <header class="image-details__header">
        <GalleryImageAuthor :author="photoInfo.user" />

        <div class="image-details__actions">
          <button><HeartIcon /></button>
          <button @click="downloadImage">Скачать</button>
        </div>
      </header>
      <div class="image-container">
        <img :src="photoInfo.urls.raw" alt="" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
}
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
    @include flex;
    @include justify-content;
    @include align-items;
  }

  &__actions {
    @include flex;
    gap: $spacing-lg;

    button {
      padding: $spacing-md;
      background-color: $white;
      border-radius: $radius-md;
      box-shadow: $shadow-default;
      cursor: pointer;
    }

    button:nth-child(1) {
      svg {
        width: 1.25rem;
      }
    }
  }
}

.image-container {
  img {
    border-radius: $radius-md;
  }
}
</style>
