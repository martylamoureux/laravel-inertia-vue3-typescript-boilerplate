declare module "@inertiajs/inertia-vue3" {
    // app.js
    import {App} from "@vue/runtime-core";
    import { ComputedRef, h } from "vue";

    interface InertiaApp {
        name: "Inertia",
        props: {
            initialPage: {
                type: Object,
                required: true,
            },
            resolveComponent: {
                type: Function,
                required: true,
            },
            resolveErrors: {
                type: Function,
                required: false,
            },
            transformProps: {
                type: Function,
                required: false,
            },
        },
        setup: (props: {
            initialPage: object,
            resolveComponent: Function,
            transformProps?: Function,
            resolveErrors?: Function
        }) => (() => ReturnType<typeof h>),
    }

    interface InertiaPlugin {
        install: (app: App, ...options: any[]) => any
    }

    interface usePageType {
        props: ComputedRef<object>,
        url: ComputedRef<string>,
        component: ComputedRef<object>,
        version: ComputedRef<string>,
    }

    export const App: InertiaApp;
    export const app: InertiaApp;
    export const plugin: InertiaPlugin;
    export const usePage: usePageType;

    // link.js

    interface InertiaLink {
        props: object,
        setup: (props: {
            as?: string,
            method?: string,
            href?: any,
            data?: object,
            replace?: boolean,
            preserveScroll?: boolean,
            preserveState?: boolean,
            headers?: object,
            onCancelToken?: Function,
            onBefore?: Function,
            onStart?: Function,
            onProgress?: Function,
            onFinish?: Function,
            onCancel?: Function,
            onSuccess?: Function,
            onError?: Function,
        }) => (() => ReturnType<typeof h>),
    }

    export const link: InertiaLink;
    export const Link: InertiaLink;

    // remember.js

    interface InertiaRemember {
        created(): void,
    }

    export const useRemember: <T = any>(data: T, key: string) => T;

    // form.js

    interface InertiaForm<T> {
        errors: object
        hasErrors: boolean
        processing: boolean
        progress: any
        wasSuccessful: boolean,
        recentlySuccessful: boolean,
        data() : T
        transform(callback: (data: T) => T) : this
        reset(...fields: string[]) : this
        clearErrors(...fields: string[]) : this
        serialize() : T & { errors: object }
        unserialize(data: object) : this
        submit(method: string, url: string, options?: object) : void
        get(url: string, options?: object) : void
        post(url: string, options?: object) : void
        put(url: string, options?: object) : void
        patch(url: string, options?: object) : void
        delete(url: string, options?: object) : void
    }

    export const useForm: <T extends object>(data?: T) => T & InertiaForm<T>;


}
