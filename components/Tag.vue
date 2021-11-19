<template>
  <span class="tag">{{ tagName }}</span>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Tag",
  props: {
    tagName: {
      type: String,
      default: ""
    }
  }
});
</script>

<style lang="scss" scoped>
.tag {
  @apply px-2 py-1 m-1 text-xs tracking-wide rounded-full bg-gray-100 text-gray-500 dark:text-gray-50 dark:bg-gray-700;
}
</style>
