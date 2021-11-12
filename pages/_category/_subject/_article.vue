<template>
  <main class="flex mx-auto">
    <ToC :toc="articleMatter.toc" />
    <Article :article-matter="articleMatter" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, useRoute } from "@nuxtjs/composition-api";
import useArticle from "@/composables/useArticle";

export default defineComponent({
  setup() {
    const route = useRoute();
    const routeParams = computed(() => route.value.params);
    const category = computed(() => route.value.params.category);
    const subject = computed(() => route.value.params.subject);
    const article = computed(() => route.value.params.article);

    const { articleMatter } = useArticle(
      category.value,
      subject.value,
      article.value
    );

    return {
      articleMatter,
      routeParams
    };
  }
});
</script>

<style lang="scss" scoped></style>
