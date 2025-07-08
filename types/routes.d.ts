import { LinkProps } from "expo-router";
import { NavigatorScreenParams } from "@react-navigation/native";
import { Link, type Router } from "expo-router";
import { type Router } from "expo-router";

/* type RootStackParamList = {
  "(tabs)": undefined;
  "/": undefined;
  "/unit/[id]": { id: string };
};
 */
type AppRoutes = {
  "/": undefined;
  "/login": undefined;
  "/dashboard": undefined;
  "/level-modules/[level]": { level: string };
  "/unit/[id]": { id: string };
  "/lesson/[id]": { id: string };
  "/level/[level]": { level: string };
  "/level/unit": undefined;
  // Agrega todas las rutas que uses
};

declare global {
  module 'expo-router' {
    interface Router extends Router<AppRoutes> {}
  }
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