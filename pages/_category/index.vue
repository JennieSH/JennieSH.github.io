<template>
  <main>
    <h1 class="my-4">Categories</h1>

    <h2 v-if="category === 'dev'">開發相關筆記整理 💻</h2>
    <h2 v-else>生活相關文章 🏂</h2>

    <!-- subject list -->
    <ul v-if="subjectData.length > 0">
      <li v-for="subject in subjectData" :key="subject.name">
        <span class="dot"></span>
        <NuxtLink
          :to="{ name: 'category-subject', params: { subject: subject.name } }"
        >
          {{ subject.name }}
          <span class="text-sm text-gray-400">({{ subject.amount }})</span>
        </NuxtLink>
      </li>
    </ul>

    <p v-else class="text-center my-10">empty</p>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from "@nuxtjs/composition-api";
import useArticle from "@/composables/useArticle";

export default defineComponent({
  setup() {
    const route = useRoute();
    const category = computed(() => route.value.params.category);

    const { subjectData } = useArticle(category.value);

    return {
      category,
      subjectData
    };
  }
});
</script>

<style lang="scss" scoped>
main {
  @apply flex flex-col items-center tracking-wide;

  h2 {
    @apply font-normal italic text-sm text-gray-400;
  }

  ul {
    @apply flex-initial my-10 w-3/5;
  }
}

li {
  @apply relative flex items-center border-l-4 border-light-border hover:border-light-active hover:text-light-active;

  a {
    @apply inline-block w-full py-4 pl-6 capitalize border-b border-dashed;
  }

  .dot {
    @apply absolute left-[-8px] block w-3 h-3 rounded-full bg-gray-400;
  }
}
</style>
