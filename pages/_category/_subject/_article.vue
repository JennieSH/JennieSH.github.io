<template>
  <main class="flex mx-auto">
    <ToC :toc="articleMatter && articleMatter.toc" />
    <Article :article-matter="articleMatter" />
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
    const article = computed(() => route.value.params.article);

    const { articleMatter } = useArticle(category, subject, article);
    const pageTitle = computed(() => articleMatter.value?.info.title);
    const pageDescription = computed(
      () => articleMatter.value?.info.description
    );

    useMetaHelper(pageTitle, pageDescription);

    return {
      articleMatter
    };
  },
  head: {}
});
</script>

<style lang="scss" scoped></style>
