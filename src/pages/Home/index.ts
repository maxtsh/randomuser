import { Lazify } from "@/routes";

export const Component = Lazify(() => import("./Home"));
