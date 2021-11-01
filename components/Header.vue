<template>
  <header>
    <div class="logo">
      <NuxtLink to="/">Jennie's Note</NuxtLink>
    </div>
    <nav>
      <!-- PC Menu -->
      <ul class="nav-pc">
        <li
          v-for="routeName in routeList"
          :key="routeName"
          :class="{
            active: routeName === activeSubRouteName
          }"
        >
          <NuxtLink :to="{ name: routeName }">{{ routeName }}</NuxtLink>
        </li>
        <ThemeSwitch class="ml-1" />
      </ul>

      <!-- Mobile Menu -->
      <Transition name="slide">
        <ul v-show="isMenuOpen" class="nav-mb">
          <li class="logo logo-mb">
            <NuxtLink to="/">Jennie's Note</NuxtLink>
            <ThemeSwitch class="ml-2" />
          </li>
          <li
            v-for="routeName in routeList"
            :key="routeName"
            :class="{
              active: routeName === activeSubRouteName
            }"
          >
            <NuxtLink :to="{ name: routeName }" @click.native="toggleMenu">
              {{ routeName }}
            </NuxtLink>
          </li>
        </ul>
      </Transition>

      <!-- Mobile Burger -->
      <div class="burger-icon" @click="toggleMenu">
        <div
          class="burger-line"
          :class="{
            open: isMenuOpen
          }"
        ></div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, useRoute } from "@nuxtjs/composition-api";
import useNav from "@/composables/useNav";
import Routes from "@/types/routes";

export default defineComponent({
  setup() {
    const routeList = [Routes.DEVELOPMENT, Routes.LIFE, Routes.ABOUT];

    const route = useRoute();
    const { isMenuOpen, toggleMenu } = useNav();

    const activeSubRouteName = computed(() => route.value.name!.split("-")[0]);

    return {
      isMenuOpen,
      routeList,
      activeSubRouteName,
      toggleMenu
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  @apply flex justify-between items-center p-4 md:px-16;
}

.logo {
  @apply text-2xl font-bold text-light-title dark:text-dark-title;

  &-mb {
    @apply flex justify-center items-center;

    a {
      @apply text-light-primary dark:text-dark-primary;
    }
  }
}

.nav-pc {
  @apply hidden md:flex;

  li {
    @apply mx-1 w-16 text-center border-b-2 border-transparent dark:text-dark-gray hover:text-light-primary dark:hover:text-dark-primary;

    text-transform: capitalize;
  }

  a {
    @apply inline-block h-full w-full;
  }

  .active {
    @apply font-bold  border-gray-200 text-light-primary dark:text-dark-primary;
  }
}

.nav-mb {
  @apply absolute left-0 top-0 z-10 h-full w-4/5 p-8 bg-gray-50 md:hidden dark:bg-black;

  li {
    @apply mb-2 pl-2 border-l-4 border-transparent hover:text-light-primary dark:hover:text-dark-primary;

    text-transform: capitalize;
  }

  .active {
    @apply border-light-primary dark:border-dark-primary;
  }
}

%line-base {
  @apply absolute w-8 h-1 rounded  duration-500;
}

.burger {
  &-icon {
    @apply relative w-8 h-8 cursor-pointer duration-1000 md:hidden;
  }

  &-line {
    @apply top-[14px] delay-500 bg-yellow-500 dark:bg-dark-primary;

    @extend %line-base;

    &::before {
      @apply top-[-12px] bg-light-red dark:bg-dark-primary;

      @extend %line-base;

      content: "";
      transition: transform 0.5s, top 0.5s 0.5s;
    }

    &::after {
      @apply top-[12px] bg-light-blue dark:bg-dark-primary;
      @extend %line-base;

      content: "";
      transition: transform 0.5s, top 0.5s 0.5s;
    }
  }

  &-line.open {
    @apply duration-100 delay-500 bg-transparent;

    &::before {
      @apply top-0 -rotate-45 bg-light-primary dark:bg-dark-primary;

      transition: top 0.5s, transform 0.5s 0.5s;
    }

    &::after {
      @apply top-0 rotate-45 bg-light-primary dark:bg-dark-primary;

      transition: top 0.5s, transform 0.5s 0.5s;
    }
  }
}
</style>
