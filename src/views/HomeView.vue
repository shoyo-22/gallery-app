<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import GalleryImageCard from '@/components/GalleryImageCard.vue';
import GalleryImageGrid from '@/components/GalleryImageGrid.vue';
import api, { ACCESS_KEY } from '@/config/api';

let photoList = ref([]);
let page = ref(1);
let loading = ref(false);
let searchQuery = ref('');

onBeforeMount(() => {
  getPhotos();
  window.addEventListener('scroll', handleScroll);
});

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const debouncedSearch = debounce(() => {
  loading.value = true;
  getPhotos(searchQuery.value);
  photoList.value = [];
  page.value = 1;
  loading.value = false;
}, 500);

async function getPhotos(searchQuery = '') {
  loading.value = true;

  const apiUrl = searchQuery.trim()
    ? `/search/photos?query=${encodeURIComponent(searchQuery)}&page=${
        page.value
      }&per_page=9&client_id=${ACCESS_KEY}`
    : `/photos?page=${page.value}&per_page=9&client_id=${ACCESS_KEY}`;

  try {
    const response = await api.get(apiUrl);
    const responseData = searchQuery.trim() ? response.data.results : response.data;
    photoList.value = [...photoList.value, ...responseData];
    page.value++;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading.value) {
    getPhotos(searchQuery.value);
  }
};

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <h1>Gallery app</h1>
  <main>
    <section>
      <input type="text" v-model="searchQuery" placeholder="Search..." @input="debouncedSearch" />
    </section>
    <GalleryImageGrid>
      <GalleryImageCard v-for="photo in photoList" :key="photo.id" :photoInfo="photo" />
    </GalleryImageGrid>
  </main>
  <div v-if="loading" style="text-align: center">Loading...</div>
</template>
