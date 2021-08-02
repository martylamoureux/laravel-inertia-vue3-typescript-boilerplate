import { ComponentOptionsMixin, createApp, defineComponent, h } from "vue";
import { App, plugin } from "@inertiajs/inertia-vue3";
import { RouteParams } from "ziggy-js";
import route, { RouteName } from "@/ziggy";

require('./bootstrap');

const el = document.getElementById("app");

createApp({
    render: () => h(App, {
        initialPage: JSON.parse(el!.dataset.page!),
        resolveComponent: require("./componentResolver")
    }),
}).use(plugin)
  .mixin({
      methods: {
          route(name: RouteName, params?: RouteParams, absolute?: boolean) {
              return route(name, params, absolute);
          }
      }
  })
  .mount(el!);
