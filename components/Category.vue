<template>
  <aside>
    <ul>
      <li v-for="subject in subjectData" :key="subject.name">
        <NuxtLink
          :to="{
            name: 'category-subject',
            params: { category: category, subject: subject.name }
          }"
        >
          {{ subject.name }}
          <span class="text-sm text-gray-400 pl-1">({{ subject.amount }})</span>
        </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import { SubjectData } from "@/types/content";

export default defineComponent({
  name: "Category",
  props: {
    category: {
      type: String,
      default: ""
    },
    subjectData: {
      type: Array as PropType<SubjectData[]>,
      default: () => []
    }
  }
});
</script>

<style lang="scss" scoped>
aside {
  @apply w-1/5 max-h-screen mr-2 px-2 py-8 overflow-scroll;

  li {
    @apply py-2 px-4 font-bold cursor-pointer rounded hover:bg-light-block dark:hover:bg-dark-block;
  }

  a {
    @apply capitalize;
  }
}
</style>
