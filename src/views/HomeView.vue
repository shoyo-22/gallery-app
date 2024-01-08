<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import GalleryImageCard from '@/components/GalleryImageCard.vue';
import GalleryImageGrid from '@/components/GalleryImageGrid.vue';
import ScrollToTopBtn from '@/components/common/ScrollToTopBtn.vue';
import BaseLoader from '@/components/common/BaseLoader.vue';
import api from '@/config/api';
import { debounce } from '@/utils/utils';

let photoList = ref([]);
let page = ref(1);
let loading = ref(false);
let searchQuery = ref('');

onBeforeMount(() => {
  getPhotos();
  window.addEventListener('scroll', handleScroll);
});

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
    ? `/search/photos?query=${encodeURIComponent(searchQuery)}&`
    : `/photos?`;

  try {
    const response = await api.get(`${apiUrl}page=${page.value}&per_page=9`);
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
  <main>
    <section class="query-section">
      <img src="@/assets/overlay-image.jpeg" alt="" />
      <input type="text" v-model="searchQuery" placeholder="Search..." @input="debouncedSearch" />
    </section>
    <GalleryImageGrid>
      <GalleryImageCard v-for="photo in photoList" :key="photo.id" :photoInfo="photo" />
    </GalleryImageGrid>
    <BaseLoader v-if="loading" />
  </main>
  <ScrollToTopBtn />
</template>

<style lang="scss" scoped>
.query-section {
  padding: $spacing-7xl $spacing-xl;
  position: relative;
  background-color: rgba($black, 0.5);
  display: flex;
  justify-content: center;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  input {
    max-width: 54em;
    width: 100%;
    padding: $spacing-2xl;
    background-color: $white;
  }
}
</style>
