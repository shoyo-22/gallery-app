import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ImageDetailsView from '@/views/ImageDetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/image/:id',
      name: 'image-details',
      component: ImageDetailsView,
      props: true,
    },
  ],
});

export default router;
