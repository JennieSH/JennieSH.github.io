import { ref } from "@vue/composition-api";

const isMenuOpen = ref(false);

const useNav = () => {
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  return {
    isMenuOpen,
    toggleMenu
  };
};

export default useNav;
