<template>
  <div class="loader-container">
    <div class="loader"></div>
  </div>
</template>

<style lang="scss" scoped>
.loader-container {
  @include flex;
  @include justify-content(center);
  padding: $spacing-md;
}

.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid $black;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
