<template>
  <main class="flex">
    <Category class="flex-none hidden lg:block" :subject-data="subjectData" />

    <ArticleList
      :subject="subject"
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
    const category = computed(() => route.value.params.category);
    const subject = computed(() => route.value.params.subject);

    const { subjectData, articleMatterList } = useArticle(
      category.value,
      subject.value
    );

    useMetaHelper(subject);

    return {
      subjectData,
      subject,
      articleMatterList
    };
  },
  head: {}
});
</script>

<style lang="scss" scoped></style>
