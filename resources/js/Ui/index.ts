import { h, VNode, VNodeArrayChildren } from "vue";

export type UiElement<TElement extends Record<string, any> = {}> = Partial<BaseElement & TElement>;

class Element<TElement> {
    constructor(
       protected props: UiElement<TElement> = {}
    ) {

    }

    createProxy() : UiElement<TElement> {
        return new Proxy<UiElement<TElement>>(this.props, {
            get: <K extends keyof BaseElement & TElement>(target: UiElement<TElement>, prop: K) => {
                return this.props[prop];
            },
            set: <K extends keyof BaseElement & TElement>(target: UiElement<TElement>, prop: K, value: (BaseElement & TElement)[K]) => {
                this.props[prop] = value;
                return true;
            }
        });
    }

    getProps() : UiElement<TElement> {
        return this.props;
    }
}

type TestElement<TElement> = Element<TElement> & UiElement<TElement>;

interface BaseElement {
    class: string
    onClick: (ev: Event) => void
}

export interface InputElement {
    onIpnut: (ev: Event) => void
}

export type UiChild = void | VNode | VNodeArrayChildren;
export type UiChildren = UiChild | (() => UiChild);

export type UiCallback<TElement extends Record<string, any> = {}> = (e: UiElement<TElement>) => UiChildren;

function ui<TElement extends Record<string, any> = {}>(type: string, defaultCallback?: UiCallback<TElement>) {
    return (callback: UiCallback<TElement>) => {
        const element = new Element<TElement>();
        const proxy = element.createProxy();

        if (defaultCallback) {
            defaultCallback(proxy);
        }

        const children = callback(proxy);

        return h(type, element.getProps(), () => children);
    }
}

export const Box = ui("div");
