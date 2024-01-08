<script setup>
import { ref, onBeforeMount } from 'vue';
import api from '@/config/api';
import BaseLoader from '@/components/common/BaseLoader.vue';
import GalleryImageCard from '@/components/GalleryImageCard.vue';
import GalleryImageGrid from '@/components/GalleryImageGrid.vue';
import ScrollToTopBtn from '@/components/common/ScrollToTopBtn.vue';

let favoriteList = ref([]);
let photoList = ref([]);
let loading = ref(false);

function getFavoriteList() {
  const storedData = localStorage.getItem('favoriteList');
  favoriteList.value = storedData ? JSON.parse(storedData) : [];
}

onBeforeMount(() => {
  getFavoriteList();
  getPhotos();
});

async function getPhotos() {
  if (!favoriteList.value.length) {
    return [];
  }

  loading.value = true;
  for (const photoId of favoriteList.value) {
    try {
      const response = await api.get(`/photos/${photoId}`);
      photoList.value.push(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  }
}
</script>

<template>
  <h1>Избранное</h1>
  <p v-if="!favoriteList.length">Список пуст</p>
  <main v-else>
    <BaseLoader v-if="loading" />
    <GalleryImageGrid v-else>
      <GalleryImageCard v-for="photo in photoList" :key="photo.id" :photoInfo="photo" />
    </GalleryImageGrid>
  </main>
  <ScrollToTopBtn />
</template>

<style lang="scss" scoped>
h1,
p {
  text-align: center;
}

h1 {
  margin: $spacing-xl 0;
  font-size: 2rem;
  font-weight: 700;
}
</style>
