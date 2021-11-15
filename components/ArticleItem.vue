<template>
  <li>
    <NuxtLink
      :to="{
        name: 'category-subject-article',
        params: {
          category: category,
          subject: subject,
          article: article.fileName
        }
      }"
      :title="article.title"
    >
      <h2 class="font-bold text-lg">{{ article.title }}</h2>
      <span class="text-sm text-gray-400">{{
        formatTime(article.createdAt)
      }}</span>
      <p class="my-4 text-gray-800 dark:text-white">
        {{ article.description }}
      </p>
      <Tag
        v-for="(tag, index) in article.tags"
        :key="`${index}.${tag}`"
        :tag-name="tag"
      />
    </NuxtLink>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { BasicInfo } from "@/types/content";
import { formatTime } from "@/utils/format";

export default defineComponent({
  name: "ArticleItem",
  props: {
    category: {
      type: String,
      default: ""
    },
    subject: {
      type: String,
      default: ""
    },
    article: {
      type: Object as PropType<BasicInfo>,
      default: null
    }
  },
  setup() {
    return { formatTime };
  }
});
</script>

<style lang="scss" scoped>
a {
  @apply block p-4 shadow hover:shadow-lg rounded bg-light-block dark:bg-dark-block dark:hover:bg-opacity-60;

  transition: all 0.3s ease-out;
}
</style>
