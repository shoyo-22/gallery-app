<script setup>
import { RouterLink } from 'vue-router';
import HeartIcon from '@/components/icons/HeartIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
</script>

<template>
  <header>
    <div class="container">
      <img src="@/assets/app-logo.png" alt="App Logo" />

      <nav>
        <RouterLink to="/"><SearchIcon /> <span>Поиск</span></RouterLink>
        <RouterLink to="/favorites"><HeartIcon /> <span>Избранное</span></RouterLink>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  padding: $spacing-3xl $spacing-xl;
  background-color: $black;

  .container {
    @include container;
    @include flex;
    @include justify-content();
    @include align-items();

    img {
      width: clamp(84px, 20%, 185px);
      height: auto;
    }

    nav {
      @include flex;
      @include justify-content();
      @include align-items();
      gap: $spacing-xl;

      a {
        @extend nav;
        gap: $spacing-xs;

        span {
          color: $white;

          @media (max-width: $device-sm) {
            display: none;
          }
        }
        svg {
          width: 2rem;
          color: $white;
        }
      }
    }
  }
}
</style>
