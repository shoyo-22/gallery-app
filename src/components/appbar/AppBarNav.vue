<script setup>
import { RouterLink } from 'vue-router';
import HeartIcon from '@/components/icons/HeartIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
</script>

<template>
  <nav>
    <RouterLink to="/"><SearchIcon /> <span>Поиск</span></RouterLink>
    <RouterLink to="/favorites"><HeartIcon /> <span>Избранное</span></RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  @include flex;
  @include justify-content();
  @include align-items();
  gap: $spacing-xl;

  a {
    @extend nav;
    gap: $spacing-xs;

    span {
      color: rgba($white, 0.5);

      @media (max-width: $device-sm) {
        display: none;
      }
    }
    svg {
      width: 2rem;
      color: rgba($white, 0.5);
    }
  }

  a.router-link-active.router-link-exact-active {
    span {
      color: $white;
    }

    svg {
      color: $white;
    }
  }
}
</style>
