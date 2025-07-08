// types/routes.d.ts
import { type Router } from "expo-router";

type AppRoutes = {
  "/": undefined;
  "/login": undefined;
  "/dashboard": undefined;
  "/level-modules/[level]": { level: string };
  "/unit/[id]": { id: string };
  "/lesson/[id]": { id: string };
  "/level/[level]": { level: string };
  "/level/unit": undefined;
};

declare module "expo-router" {
  interface Router extends Router<AppRoutes> {}
}
/* declare global {
  namespace ReactNavigation {
    interface RootParamList {
      index: undefined;
      "(tabs)": undefined;
      path: undefined;
      "unit/[id]": { id: string };
      "lesson/[id]": { id: string };
    }
  }
} */
