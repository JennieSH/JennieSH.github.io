<template>
  <div class="app">
    <Header />
    <Nuxt class="container" />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import useDarkMode from "@/composables/useDarkMode";

export default defineComponent({
  name: "Default",
  setup() {
    const { initTheme } = useDarkMode();

    initTheme();
  }
});
</script>

<style lang="scss"></style>
