<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import GalleryImageCard from '@/components/GalleryImageCard.vue';
import GalleryImageGrid from '@/components/GalleryImageGrid.vue';
import api, { ACCESS_KEY } from '@/config/api';

let photoList = ref([]);
let page = ref(1);
let loading = ref(false);

onBeforeMount(() => {
  getPhotos();
  window.addEventListener('scroll', handleScroll);
});

async function getPhotos() {
  loading.value = true;

  try {
    const response = await api.get(`/photos?page=${page.value}&per_page=9&client_id=${ACCESS_KEY}`);
    photoList.value = [...photoList.value, ...response.data];
    page.value++;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading.value) {
    getPhotos();
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <h1>Gallery app</h1>
  <main>
    <GalleryImageGrid>
      <GalleryImageCard v-for="photo in photoList" :key="photo.id" :photoInfo="photo" />
    </GalleryImageGrid>
  </main>
  <div v-if="loading" style="text-align: center">Loading...</div>
</template>
