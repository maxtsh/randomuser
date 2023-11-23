import { Lazify } from "@/routes";
import HomeLoading from "./Home.loading";

const HomePage = Lazify(() => import("./Home"), HomeLoading);

export default HomePage;
