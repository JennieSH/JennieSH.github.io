import {
  useMeta,
  useRoute,
  ComputedRef,
  computed
} from "@nuxtjs/composition-api";

const initMeta = {
  title: "傑尼海馬迴｜Jennie DEV",
  description:
    "90% 開發筆記 + 10% 生活雜記，目前為前端工程師，紀錄開發時遇到的疑難雜症和學習筆記，偶爾穿插生活記事，透過文字延長記憶存放的期限。",
  url: process.env.baseUrl,
  keywords: "前端開發、技術部落格、生活、旅遊"
};

const useMetaHelper = (
  pageTitle: ComputedRef<string | undefined>,
  pageDescription?: ComputedRef<string | undefined>,
  pageKeywords?: ComputedRef<string | undefined>
) => {
  const route = useRoute();

  const concatTitle = computed(() => {
    return pageTitle?.value
      ? `${pageTitle.value}｜${initMeta.title}`
      : initMeta.title;
  });

  // meta tag
  useMeta(() => ({
    title: concatTitle.value,
    meta: [
      {
        hid: "description",
        name: "description",
        content: pageDescription?.value || initMeta.description
      },
      {
        hid: "og:title",
        name: "og:title",
        content: concatTitle.value
      },
      {
        hid: "og:description",
        name: "og:description",
        content: pageDescription?.value || initMeta.description
      },
      {
        hid: "og:url",
        name: "og:url",
        content: initMeta.url + route.value.fullPath
      },
      {
        hid: "keywords",
        name: "keywords",
        content: pageKeywords?.value || initMeta.keywords
      }
    ]
  }));
};

export default useMetaHelper;
