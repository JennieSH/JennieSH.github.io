<template>
  <main class="flex mx-auto">
    <ToC :toc="articleMatter && articleMatter.toc" />
    <Article
      :article-matter="articleMatter"
      :category="routeParams.category"
      :subject="routeParams.subject"
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

    const { getArticleMatter } = useArticle();
    const articleMatter = getArticleMatter(
      routeParams.value.category,
      routeParams.value.subject,
      routeParams.value.article
    );
    const pageTitle = computed(() => articleMatter.value?.info.title);
    const pageDescription = computed(
      () => articleMatter.value?.info.description
    );

    useMetaHelper(pageTitle, pageDescription);

    return {
      routeParams,
      articleMatter
    };
  },
  head: {}
});
</script>

<style lang="scss" scoped></style>
