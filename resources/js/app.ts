import { ComponentOptionsMixin, createApp, defineComponent, h } from "vue";
import { createInertiaApp, plugin } from "@inertiajs/inertia-vue3";
import { RouteParams } from "ziggy-js";
import route, { RouteName } from "@/ziggy";

require('./bootstrap');

// const el = document.getElementById("app");
//
// createApp({
//     render: () => h(App, {
//         initialPage: JSON.parse(el!.dataset.page!),
//         resolveComponent: require("./componentResolver")
//     }),
// }).use(plugin)
//   .mixin({
//       methods: {
//           route(name: RouteName, params?: RouteParams, absolute?: boolean) {
//               return route(name, params, absolute);
//           }
//       }
//   })
//   .mount(el!);

createInertiaApp({
    resolve: require("./componentResolver"),
    setup({ el, app, props, plugin }) {
        createApp({ render: () => h(app, props) })
            .use(plugin)
            .mixin({
                methods: {
                    route(name: RouteName, params?: RouteParams, absolute?: boolean) {
                        return route(name, params, absolute);
                    }
                }
            })
            .mount(el)
    },
}).then()
