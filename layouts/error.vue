<template>
  <main class="error-container">
    <template v-if="error.statusCode === 404">
      <h1>Error 404</h1>
      <h2 class="my-2 uppercase">This page doesn’t exist.</h2>
    </template>
    <h1 v-else>An error occurred</h1>
    <NuxtLink class="text-sm hover:text-gray-600" to="/">
      ＜ Back to Home page
    </NuxtLink>
  </main>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
.error-container {
  @apply min-h-screen flex flex-col justify-center items-center bg-gray-50;

  h1 {
    @apply mb-10 px-4 text-[3rem] text-gray-300;

    animation: twinkle 0.5s alternate infinite;
  }
}
</style>
