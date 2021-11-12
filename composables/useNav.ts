import { ref } from "@vue/composition-api";
import Routes from "@/types/routes";

const routeList = [
  { name: "Dev", path: Routes.DEVELOPMENT },
  { name: "Life", path: Routes.LIFE },
  { name: "About", path: Routes.ABOUT }
];

const useNav = () => {
  const isMenuOpen = ref(false);

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };

  const checkActivePath = (
    categoryPath: string,
    activePath: string
  ): boolean => {
    if (categoryPath === Routes.DEVELOPMENT || categoryPath === Routes.LIFE) {
      return activePath.includes(categoryPath);
    }

    return activePath === Routes.ABOUT;
  };

  return { routeList, isMenuOpen, toggleMenu, checkActivePath };
};

export default useNav;
