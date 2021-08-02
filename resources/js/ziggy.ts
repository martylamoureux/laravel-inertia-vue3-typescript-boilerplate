import { Ziggy as RoutesConfig } from "./ziggy.generated";
import { RouteParams, Router as BaseRouter } from "ziggy-js";
import Ziggy from "ziggy/index.es";

export type RouteName = keyof typeof RoutesConfig.routes;

export interface ZiggyRouter extends BaseRouter {
    current(): RouteName;
    current(name: RouteName): boolean;
    check(name: RouteName): boolean;
}

export default function route(name: RouteName, params?: RouteParams, absolute?: boolean): string {
    return Ziggy(name, params, absolute, RoutesConfig) as string;
}

export const Router: ZiggyRouter = Ziggy(false, false, false, RoutesConfig) as unknown as ZiggyRouter;
