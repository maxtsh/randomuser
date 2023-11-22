import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};
export default Layout;
