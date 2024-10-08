export default {
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "傑尼海馬迴｜Jennie DEV",
    htmlAttrs: {
      lang: "zh-tw"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "google-site-verification",
        content: "KAONipFn6ticaFtY32RIDOQP-5J9AcuoHlXoV8mzBRc"
      },
      {
        hid: "description",
        name: "description",
        content:
          "90% 開發筆記 + 10% 生活雜記，目前為前端工程師，紀錄開發時遇到的疑難雜症和學習筆記，偶爾穿插生活記事，透過文字延長記憶存放的期限。"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "傑尼海馬迴｜Jennie DEV"
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "90% 開發筆記 + 10% 生活雜記，目前為前端工程師，紀錄開發時遇到的疑難雜症和學習筆記，偶爾穿插生活記事，透過文字延長記憶存放的期限。"
      },
      {
        hid: "og:url",
        property: "og:url",
        content: process.env.BASE_URL
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "傑尼海馬迴｜Jennie DEV"
      },
      { hid: "og:type", property: "og:type", content: "article" },
      { hid: "og:image", property: "og:image", content: "/favicon.ico" },
      { hid: "og:image:width", property: "og:image:width", content: "300" },
      { hid: "og:image:height", property: "og:image:height", content: "300" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Lato:wght@400;700&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.scss", "highlight.js/styles/github-dark.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/composition-api/module",
    "@/modules/generator"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/svg-sprite", "@nuxtjs/sitemap"],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.node = {
        fs: "empty"
      };

      config.module.rules.push({
        test: /\.md/,
        use: [
          {
            loader: "markdownit-loader"
          }
        ]
      });
    }
  },

  env: {
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },

  sitemap: {
    hostname: process.env.BASE_URL,
    gzip: true,
    defaults: {
      changefreq: "weekly",
      priority: 1,
      lastmod: new Date()
    }
  }
};
