<script setup>
import AppBarImage from './appbar/AppBarImage.vue';
import AppBarNav from './appbar/AppBarNav.vue';
</script>

<template>
  <header>
    <div class="container">
      <AppBarImage />
      <AppBarNav />
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
  }
}
</style>
