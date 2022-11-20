<template>
  <main class="flex flex-col justify-center">
    <section class="introduction">
      <div class="introduction-img">
        <div>
          <img src="@/assets/images/Avatar.jpg" alt="avatar" />
        </div>
      </div>

      <div class="introduction-content">
        <h2>Hello, I'm Jennie.</h2>
        <a
          :href="Link.GITHUB"
          target="_blank"
          rel="noreferrer noopener"
          title="github"
          class="inline-block"
        >
          <SvgIcon class="github" name="github" />
        </a>

        <p class="text-common-gray">90 % 開發筆記 + 10 % 生活雜記</p>
        <p>
          曾經看過一篇文章提及，如果對來自外部的訊息進行重新編碼，會在腦海中形成深刻的印象，愈是刻意學習，記憶會愈加持久。
        </p>
        <p>
          整理筆記這件事，除了訓練自己的文字組織能力外，未來遇到同樣的問題，還能加快解決
          bug 的時間 XD
        </p>
      </div>
    </section>

    <ul class="category">
      <li>
        <NuxtLink :to="Routes.DEVELOPMENT" title="Dev - 程式開發相關筆記">
          <span>Dev</span> - 程式開發相關筆記
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="Routes.LIFE" title="Life - 生活、旅遊、食譜">
          <span>Life</span> - 生活、旅遊、食譜
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import Link from "@/types/link";
import Routes from "@/types/routes";

export default defineComponent({
  name: "Home",
  setup() {
    return {
      Link,
      Routes
    };
  }
});
</script>

<style lang="scss" scoped>
.introduction {
  @apply flex flex-col justify-center items-center mx-auto md:flex-row;

  &-img {
    @apply flex flex-col items-center justify-center mx-[10%];

    > div {
      @apply w-60 h-60 mb-2 rounded-full overflow-hidden;
    }
  }

  &-content {
    @apply mt-6 px-10 md:mt-0;

    p {
      @apply my-5 text-sm leading-relaxed;
    }

    .github {
      @apply mt-5 w-7 h-7;
    }
  }
}

.category {
  @apply flex flex-col items-center justify-evenly md:mt-10 md:flex-row;

  li {
    @apply relative mb-8 ml-4 w-[fit-content] border-b text-sm hover:border-common-active md:mt-10;

    &::before {
      @apply absolute -left-4 text-common-active;

      content: "»";
      animation: swing 3s infinite, fadeInOut 5s infinite;
    }
  }

  span {
    @apply font-bold text-base;
  }
}
</style>
