<script setup>
import { onBeforeMount, ref } from 'vue';
import axios from 'axios';
import GalleryImageCard from '@/components/GalleryImageCard.vue';
import GalleryImageGrid from '@/components/GalleryImageGrid.vue';

let photoList = ref([]);

onBeforeMount(() => {
  getPhotos();
});

async function getPhotos() {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos?page=1&per_page=9&client_id=${
        import.meta.env.VITE_ACCESS_KEY
      }`,
    );
    photoList.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <h1>Gallery app</h1>
  <main>
    <GalleryImageGrid>
      <GalleryImageCard v-for="photo in photoList" :key="photo.id" :photoInfo="photo" />
    </GalleryImageGrid>
  </main>
</template>
