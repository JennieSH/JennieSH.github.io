<template>
  <footer>Copyright © {{ year }} JennieSH</footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  setup() {
    const year = computed(() => new Date().getFullYear());

    return {
      year
    };
  }
});
</script>

<style lang="scss" scoped>
footer {
  @apply py-4 flex justify-center items-center;
}
</style>
