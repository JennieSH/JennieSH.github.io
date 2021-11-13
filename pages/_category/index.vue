<template>
  <main>
    <h1 class="my-4">Categories</h1>
    <h2>{{ pageText.subTitle }}</h2>

    <!-- subject list -->
    <ul v-if="subjectData && subjectData.length > 0">
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
import useMetaHelper from "@/composables/useMetaHelper";
import Routes from "@/types/routes";

const titleText = {
  dev: {
    title: "技術文章目錄",
    subTitle: "開發相關筆記整理 💻"
  },
  life: {
    title: "生活文章目錄",
    subTitle: "生活相關文章 🏂"
  }
};

export default defineComponent({
  setup() {
    const route = useRoute();
    const pageText = computed(() =>
      route.value.path === Routes.DEVELOPMENT ? titleText.dev : titleText.life
    );
    const pageTitle = computed(() => pageText.value.title);

    const { getSubjectDataList } = useArticle();
    const subjectData = getSubjectDataList(route.value.params.category);

    useMetaHelper(pageTitle);

    return {
      pageText,
      subjectData
    };
  },
  head: {}
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
  @apply relative flex items-center border-l-4 hover:border-common-active hover:text-common-active;

  a {
    @apply inline-block w-full py-4 pl-6 capitalize border-b border-dashed;
  }

  .dot {
    @apply absolute left-[-8px] block w-3 h-3 rounded-full bg-light-gray dark:bg-dark-gray;
  }
}
</style>
