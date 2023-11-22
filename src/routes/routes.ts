import type { RouteObject } from "react-router-dom";

const Home = () => import("@/pages/Home");

const routes: RouteObject[] = [
  {
    path: "/",
    lazy: Home,
  },
];

export default routes;
