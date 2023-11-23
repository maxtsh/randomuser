import { Link } from "react-router-dom";
import styles from "./Notfound.module.scss";

const Notfound = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default Notfound;
