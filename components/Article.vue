<template>
  <article
    v-if="articleMatter"
    class="mx-auto px-8 py-6 xl:px-16 dark:bg-dark-black"
  >
    <div class="markdown" v-html="articleMatter.content"></div>

    <div v-if="tagList.length > 0" class="mt-10 text-dark-gray text-sm">
      Tags：
      <Tag v-for="tag in tagList" :key="tag" :tag-name="tag" />
    </div>

    <div v-if="publishedDate" class="mt-4 text-dark-gray text-sm">
      Last Update Date： {{ publishedDate }}
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "@nuxtjs/composition-api";
import { FrontMatter } from "@/types/content";

export default defineComponent({
  name: "Article",
  props: {
    articleMatter: {
      type: Object as PropType<FrontMatter>,
      default: null
    }
  },
  setup(props) {
    const tagList = computed(() => props.articleMatter.info.tags || []);
    const publishedDate = computed(
      () => props.articleMatter.info.publishedDate || ""
    );

    return {
      tagList,
      publishedDate
    };
  }
});
</script>
