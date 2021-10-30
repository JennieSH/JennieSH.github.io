import { ref, watch } from "@vue/composition-api";
import { getLocalItem, setLocalItem } from "@/utils/localStorage";

enum Theme {
  LIGHT = "light",
  DARK = "dark"
}

const THEME_STORAGE_KEY = "theme";

const isDarkMode = ref(false);

const useDarkMode = () => {
  const initTheme = () => {
    // only execution client-side: https://github.com/nuxt/nuxt.js/issues/30
    if (process.server) return;

    const localStorageMode = getLocalItem(THEME_STORAGE_KEY);
    const isLocalStorageDarkMode = localStorageMode === Theme.DARK;
    const isOSDarkMode =
      !localStorageMode &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (isLocalStorageDarkMode || isOSDarkMode) {
      isDarkMode.value = true;
    } else {
      isDarkMode.value = false;
    }
  };

  const toggleThemeMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  watch(
    () => isDarkMode.value,
    () => {
      if (process.server) return;

      console.log("toggleThemeMode");

      if (isDarkMode.value) {
        document.documentElement.classList.add("dark");
        setLocalItem(THEME_STORAGE_KEY, Theme.DARK);
      } else {
        document.documentElement.classList.remove("dark");
        setLocalItem(THEME_STORAGE_KEY, Theme.LIGHT);
      }
    }
  );

  return {
    isDarkMode,
    initTheme,
    toggleThemeMode
  };
};

export default useDarkMode;
