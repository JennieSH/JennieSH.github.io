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
            active: routeName === activeRoute
          }"
        >
          <NuxtLink :to="{ name: routeName }">{{ routeName }}</NuxtLink>
        </li>
        <ModeSwitch />
      </ul>

      <!-- Mobile Menu -->
      <Transition name="slide">
        <ul v-show="isMenuOpen" class="nav-mb">
          <li
            v-for="routeName in routeList"
            :key="routeName"
            :class="{
              active: routeName === activeRoute
            }"
          >
            <NuxtLink :to="{ name: routeName }" @click.native="toggleMenu">
              {{ routeName }}
            </NuxtLink>
          </li>
        </ul>
      </Transition>

      <!-- Mobile Burger -->
      <div
        class="burger-icon"
        :class="{
          open: isMenuOpen
        }"
        @click="toggleMenu"
      >
        <div class="line"></div>
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
    const route = useRoute();
    const { isMenuOpen, toggleMenu } = useNav();

    const routeList = [Routes.DEVELOPMENT, Routes.LIFE, Routes.ABOUT];

    const activeRoute = computed(() => route.value.name);

    return {
      isMenuOpen,
      routeList,
      activeRoute,
      toggleMenu
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  @apply flex justify-between items-center p-4 md:px-16;

  .logo {
    @apply text-light-black text-2xl font-bold dark:text-white;
  }
}

.nav-pc {
  @apply hidden md:flex;

  li {
    @apply mx-1 w-16 text-center rounded-full hover:text-light-primary dark:text-dark-gray dark:hover:text-dark-primary;

    text-transform: capitalize;
  }

  a {
    @apply inline-block h-full w-full;
  }

  .active {
    @apply text-light-primary dark:text-dark-primary dark:font-bold dark:bg-none;

    background-image: linear-gradient(transparent 50%, #f1f1f1 50%);
  }
}

.nav-mb {
  @apply absolute left-0 top-0 z-10 h-full w-4/5 p-8 bg-gray-50 md:hidden dark:bg-black;

  li {
    @apply mb-2 pl-2 border-l-4 border-transparent hover:text-light-primary dark:text-dark-secondary dark:hover:text-dark-primary;

    text-transform: capitalize;
  }

  .active {
    @apply border-light-primary dark:border-dark-primary;
  }
}

.burger-icon {
  @apply relative w-8 h-8 cursor-pointer duration-1000 md:hidden;

  .line {
    @apply absolute top-[14px] w-8 h-1 bg-yellow-500 rounded duration-500 delay-500 dark:bg-dark-primary;

    &::before {
      @apply absolute top-[-12px] w-8 h-1 bg-light-red rounded duration-500 dark:bg-dark-primary;

      content: "";
      transition: transform 0.5s, top 0.5s 0.5s;
    }

    &::after {
      @apply absolute top-[12px] w-8 h-1 bg-light-blue rounded duration-500 dark:bg-dark-primary;

      content: "";
      transition: transform 0.5s, top 0.5s 0.5s;
    }
  }

  &.open {
    .line {
      @apply duration-100 delay-500 bg-transparent;
    }

    .line::before {
      @apply top-0 -rotate-45 bg-light-primary dark:bg-dark-primary;

      transition: top 0.5s, transform 0.5s 0.5s;
    }

    .line::after {
      @apply top-0 rotate-45 bg-light-primary dark:bg-dark-primary;

      transition: top 0.4s, transform 0.5s 0.5s;
    }
  }
}
</style>
