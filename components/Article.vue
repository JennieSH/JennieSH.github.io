<template>
  <article
    v-if="articleMatter"
    class="mx-auto px-8 py-6 xl:px-16 dark:bg-dark-black"
  >
    <div class="info">
      <NuxtLink
        :to="{
          name: 'category-subject',
          params: { category: category, subject: subject }
        }"
        :title="`Back to ${subject}`"
        class="info-item info-link"
      >
        <SvgIcon class="info-icon mr-2" name="folder-open" />
        {{ subject }}
      </NuxtLink>

      <div v-if="createdAt" class="info-item mx-8">
        <SvgIcon class="info-icon mr-2" name="calendar" />
        {{ createdAt }}
      </div>

      <div class="info-item">
        <SvgIcon class="info-icon mr-2" name="clock" />
        {{ readingTime }} min read
      </div>
    </div>

    <!-- Article Content -->
    <div class="markdown" v-html="articleMatter.content"></div>

    <div class="flex flex-wrap items-center mt-4">
      <SvgIcon v-if="tagList.length > 0" class="info-icon mr-1" name="tag" />

      <Tag v-for="tag in tagList" :key="tag" :tag-name="tag" />
    </div>

    <div
      class="flex flex-wrap justify-between mt-4 text-sm italic text-dark-gray"
    >
      <div v-if="createdAt">Published on {{ createdAt }}</div>
      <div v-if="updatedAt">Updated on {{ updatedAt }}</div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "@nuxtjs/composition-api";
import { ArticleData } from "@/types/content";
import { formatTime } from "@/utils/format";
import { calculateReadingTime } from "@/utils/parser";

export default defineComponent({
  name: "Article",
  props: {
    category: {
      type: String,
      default: ""
    },
    subject: {
      type: String,
      default: ""
    },
    articleMatter: {
      type: Object as PropType<ArticleData>,
      default: null
    }
  },
  setup(props) {
    const tagList = computed(() => props.articleMatter.info.tags || []);
    const createdAt = computed(() =>
      formatTime(props.articleMatter.info.createdAt)
    );
    const updatedAt = computed(() =>
      formatTime(props.articleMatter.info.updatedAt)
    );
    const readingTime = computed(() =>
      calculateReadingTime(props.articleMatter.wordCount)
    );

    return {
      tagList,
      createdAt,
      updatedAt,
      readingTime
    };
  }
});
</script>

<style lang="scss" src="@/assets/style/markdown.scss"></style>

<style lang="scss" scoped>
.info {
  @apply flex items-center font-bold text-sm text-gray-600 dark:text-gray-50;

  &-item {
    @apply flex items-center;
  }

  &-link {
    @apply uppercase hover:text-common-link;
  }

  &-icon {
    @apply inline-block h-4 w-4 text-gray-400;
  }
}
</style>
