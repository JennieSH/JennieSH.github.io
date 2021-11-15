<template>
  <main class="flex">
    <Category
      class="flex-none hidden lg:block"
      :category="routeParams.category"
      :subject-data="subjectData"
    />

    <ArticleList
      :category="routeParams.category"
      :subject="routeParams.subject"
      :article-matter-list="articleMatterList"
      class="flex-grow"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from "@nuxtjs/composition-api";
import useArticle from "@/composables/useArticle";
import useMetaHelper from "@/composables/useMetaHelper";

export default defineComponent({
  setup() {
    const route = useRoute();
    const routeParams = computed(() => route.value.params);
    const subject = computed(() => route.value.params.subject);

    const { getSubjectDataList, getArticleMatterList } = useArticle();
    const subjectData = getSubjectDataList(routeParams.value.category);
    const articleMatterList = getArticleMatterList(
      routeParams.value.category,
      routeParams.value.subject
    );

    useMetaHelper(subject);

    return {
      routeParams,
      subjectData,
      articleMatterList
    };
  },
  head: {}
});
</script>

<style lang="scss" scoped></style>
