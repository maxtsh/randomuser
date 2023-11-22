import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "@/routes";
import Notfound from "@/pages/NotFound";
import "@/styles/Global.css";

const router = createBrowserRouter([
  {
    path: "/",
    children: Routes,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
