<template>
  <section
    v-if="toc"
    :class="{
      show: isToCShow
    }"
  >
    <ul>
      <li class="title">
        <a :href="`#${toc.title}`">{{ toc.title }}</a>
      </li>
      <li v-for="subtitle in toc.subtitles" :key="subtitle">
        <a :href="`#${subtitle}`">{{ subtitle }}</a>
      </li>
    </ul>

    <div class="toc-tab" @click="toggleToC">
      <SvgIcon class="h-5 w-5 text-gray-400" name="menu" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@nuxtjs/composition-api";
import { ToC } from "@/types/content";

export default defineComponent({
  name: "ToC",
  props: {
    toc: {
      type: Object as PropType<ToC>,
      default: () => ({
        title: "",
        subtitles: []
      })
    }
  },
  setup() {
    const isToCShow = ref(true);

    const toggleToC = () => {
      isToCShow.value = !isToCShow.value;
    };

    return {
      isToCShow,
      toggleToC
    };
  }
});
</script>

<style lang="scss" scoped>
section {
  @apply fixed hidden left-0 top-[15%] py-5 px-8 h-[fit-content] w-56 bg-light-block dark:text-dark-text dark:bg-dark-block xl:block 2xl:w-72;

  transform: translateX(-95%);
  transition: all 1.5s ease-in-out;

  &.show {
    transform: translateX(0);
  }

  li {
    @apply pl-3 pt-1 text-[13px] truncate;
  }

  a {
    @apply hover:text-common-active;
  }

  .title {
    @apply mb-2 pl-0 text-sm font-bold;
  }

  .toc-tab {
    @apply absolute top-0 right-[-28px] w-7 h-7 flex items-center justify-center rounded-r-full cursor-pointer bg-light-block dark:bg-dark-block;
  }
}
</style>
