<template>
  <section>
    <h1 class="font-bold text-2xl capitalize">
      {{ subject }}
    </h1>

    <p v-if="!articleMatterList" class="mt-8">loading ....</p>
    <p v-else-if="articleMatterList.length === 0" class="mt-8">
      Sorry... It's empty now. 🙇‍♀️
    </p>
    <ul v-else>
      <ArticleItem
        v-for="(article, index) in articleMatterList"
        :key="`${index}.${article.title}`"
        class="my-7"
        :category="category"
        :subject="subject"
        :article="article"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { BasicInfo } from "@/types/content";

export default defineComponent({
  name: "ArticleList",
  props: {
    category: {
      type: String,
      default: ""
    },
    subject: {
      type: String,
      default: ""
    },
    articleMatterList: {
      type: Array as PropType<BasicInfo[]>,
      default: () => []
    }
  }
});
</script>

<style lang="scss" scoped>
section {
  @apply px-8 py-4 bg-light-bg dark:bg-dark-bg;
}
</style>
