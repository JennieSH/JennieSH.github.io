// Sitemap for dynamic routes with SSG
// https://dev.to/andynoir/sitemap-for-dynamic-routes-in-nuxtjs-4b96

import { Module } from "@nuxt/types";

const generator: Module = function () {
  this.nuxt.hook("generate:done", async (context: any) => {
    const allRoutes: string[] = await Array.from(context.generatedRoutes);

    this.nuxt.options.sitemap.routes = await [...allRoutes];
  });
};

export default generator;
