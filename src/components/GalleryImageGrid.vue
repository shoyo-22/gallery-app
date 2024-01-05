<template>
  <section class="gallery-grid">
    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.gallery-grid {
  @include container;
  padding: $spacing-xl;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: $spacing-3xl;
}
</style>
