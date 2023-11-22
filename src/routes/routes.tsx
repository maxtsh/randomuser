import type { RouteObject } from "react-router-dom";
import HomePage from "@/pages/Home";

const routes: RouteObject[] = [
  {
    id: "home",
    path: "/",
    element: <HomePage />,
  },
];

export default routes;
