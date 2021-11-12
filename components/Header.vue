<template>
  <header>
    <div class="logo">
      <h1><NuxtLink to="/">Jennie's Note</NuxtLink></h1>
    </div>
    <nav>
      <!-- PC Menu -->
      <ul class="nav-pc">
        <li
          v-for="route in routeList"
          :key="route.name"
          :class="{
            active: checkActivePath(route.path, activePath)
          }"
        >
          <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
        </li>

        <ThemeSwitch class="ml-1" />
      </ul>

      <!-- Mobile Menu -->
      <Transition name="slide">
        <ul v-show="isMenuOpen" class="nav-mb">
          <li class="logo logo-mb">
            <NuxtLink to="/" @click.native="toggleMenu">Jennie's Note</NuxtLink>
            <ThemeSwitch class="ml-2" />
          </li>
          <li
            v-for="route in routeList"
            :key="route.name"
            :class="{
              active: checkActivePath(route.path, activePath)
            }"
          >
            <NuxtLink :to="route.path" @click.native="toggleMenu">
              {{ route.name }}
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

export default defineComponent({
  name: "Header",
  setup() {
    const route = useRoute();
    const { routeList, isMenuOpen, toggleMenu, checkActivePath } = useNav();

    const activePath = computed(() => route.value.path);

    return {
      routeList,
      isMenuOpen,
      activePath,
      toggleMenu,
      checkActivePath
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  @apply flex justify-between items-center p-4 md:px-16 xl:px-48 2xl:px-80;
}

.logo {
  @apply text-2xl font-bold text-light-title dark:text-dark-title;

  &-mb {
    @apply flex justify-center items-center;
  }
}

.nav-pc {
  @apply hidden md:flex;

  li {
    @apply mx-1 w-16 text-center border-b-2 border-transparent dark:text-dark-gray hover:text-light-active dark:hover:text-dark-active;
  }

  a {
    @apply inline-block h-full w-full;
  }

  .active {
    @apply font-bold border-gray-200 text-light-primary dark:text-dark-primary;
  }
}

.nav-mb {
  @apply absolute left-0 top-0 z-10 h-full w-4/5 p-8 bg-gray-50 md:hidden dark:bg-black;

  li {
    @apply mb-2 pl-2 border-l-4 border-transparent cursor-pointer hover:text-light-active dark:hover:text-dark-active;
  }

  .active {
    @apply border-light-primary dark:border-dark-primary;
  }
}

%line-base {
  @apply absolute w-8 h-1 rounded duration-500;
}

.burger {
  &-icon {
    @apply relative w-8 h-8 cursor-pointer duration-1000 md:hidden;
  }

  &-line {
    @apply top-[14px] delay-500 bg-light-title dark:bg-dark-title;

    @extend %line-base;

    &::before {
      @apply top-[-12px] bg-light-title dark:bg-dark-title;

      @extend %line-base;

      content: "";
      transition: transform 0.5s, top 0.5s 0.5s;
    }

    &::after {
      @apply top-[12px] bg-light-title dark:bg-dark-title;
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
