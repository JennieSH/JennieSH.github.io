<template>
  <main>
    <section class="introduction">
      <div class="introduction-img">
        <div>
          <img :src="Link.AVATAR" alt="personal-img" />
        </div>
        <span class="text-[12px] text-gray-300">
          （圖片來源:
          <a :href="Link.AVATAR" target="_blank" rel="noreferrer noopener">
            Unsplash）
          </a>
        </span>
      </div>

      <div class="introduction-content">
        <h2>Hello, I'm Jennie.</h2>
        <a
          :href="Link.GITHUB"
          target="_blank"
          rel="noreferrer noopener"
          title="github"
        >
          <SvgIcon class="github" name="github" />
        </a>
        <p class="text-light-secondary">90 % 開發筆記 + 10 % 生活雜記</p>
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
        <NuxtLink
          :to="{ name: 'category', params: { category: Routes.DEVELOPMENT } }"
        >
          <span>Dev</span> - 程式開發相關筆記
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ name: 'category', params: { category: Routes.LIFE } }">
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
  @apply flex flex-col justify-center items-center mx-auto mt-16 md:flex-row;

  &-img {
    @apply flex flex-col items-center justify-center mx-[10%];

    > div {
      @apply w-60 h-60 mb-2 rounded-full overflow-hidden;
    }
  }

  &-content {
    @apply mt-6 px-10 md:mt-0;

    p {
      @apply my-8 text-sm leading-relaxed;
    }

    .github {
      @apply mt-4 w-7 h-7;
    }
  }
}

.category {
  @apply flex flex-col items-center justify-evenly p-[8%] md:flex-row;

  li {
    @apply relative mb-8 ml-4 w-[fit-content] border-b text-sm hover:border-light-active md:mt-10;

    &::before {
      @apply absolute -left-4 text-light-active;

      content: "»";
      animation: swing 3s infinite, fadeInOut 5s infinite;
    }
  }

  span {
    @apply font-bold text-base;
  }
}
</style>
