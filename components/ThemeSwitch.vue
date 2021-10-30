<template>
  <div class="mode-switch" @click="toggleThemeMode">
    <span v-show="isDarkMode" class="moon">
      <span class="moon-inner"></span>
    </span>

    <span v-show="!isDarkMode" class="sun"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import useDarkMode from "@/composables/useDarkMode";

export default defineComponent({
  name: "ThemeSwitch",
  setup() {
    const { isDarkMode, toggleThemeMode } = useDarkMode();

    return {
      isDarkMode,
      toggleThemeMode
    };
  }
});
</script>

<style lang="scss" scoped>
.mode-switch {
  > span {
    @apply inline-block w-6 h-6 ml-1 rounded-full;
  }

  .sun {
    @apply bg-yellow-300;

    box-shadow: 0 0 4px 1px #ffd501;
  }

  .moon {
    @apply relative  bg-gray-200 overflow-visible;

    &-inner {
      @apply absolute block h-4 w-4 bg-dark-black rounded-full top-[4px] left-[-5px];
    }
  }
}
</style>
