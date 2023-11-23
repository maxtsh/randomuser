import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "@/routes";
import Notfound from "@/pages/NotFound";
import Layout from "@/Layout";
import "@/styles/Global.scss";
import "@/assets/fonts/inter/stylesheet.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", children: Routes },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
