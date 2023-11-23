import styles from "./Home.module.scss";

const HomeLoading = () => {
  return (
    <div className={styles["lazy-container"]}>
      <h1>Lazy Loading...</h1>
    </div>
  );
};
export default HomeLoading;
