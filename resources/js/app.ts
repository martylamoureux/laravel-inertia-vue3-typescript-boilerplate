import { createApp, h } from "vue";
import { App, plugin } from "@inertiajs/inertia-vue3";

require('./bootstrap');

const el = document.getElementById("app");

createApp({
    render: () => h(App, {
        initialPage: JSON.parse(el!.dataset.page!),
        resolveComponent: require("./componentResolver")
    })
}).use(plugin)
    .mount(el!);
