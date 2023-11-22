import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "@/routes";
import "@/styles/Global.css";

const router = createBrowserRouter([
  {
    path: "/",
    children: Routes,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
