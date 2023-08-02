<template>
  <button class="mode-switch" @click="toggleThemeMode">
    <SvgIcon v-show="isDarkMode" class="moon" name="moon" />
    <span v-show="!isDarkMode" class="sun"></span>
  </button>
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
$sun: #ffd501;

.mode-switch {
  @apply w-6 h-6 flex justify-center items-center;

  .sun {
    @apply inline-block w-[70%] h-[70%] rounded-full bg-yellow-300;

    box-shadow: 0 0 6px 1px $sun;
  }

  .moon {
    @apply w-full h-full text-gray-200;
  }
}
</style>
