import { useCustomFetch } from "@/hooks";
import Button from "@/components/Base/Button";
import { getUserData } from "./Home.api";
import styles from "./Home.module.scss";

const Home = () => {
  const { data, error, status } = useCustomFetch(getUserData);

  return (
    <div className={styles.container}>
      {status === "pending" && <p className="loading">Fetching data...</p>}
      {status === "error" && (
        <p className="error">{error || "Could not fetch data"}</p>
      )}
      {status === "sucess" && (
        <div className="card">
          <div className="card__header">
            <img
              className="card__header__avatar"
              src={data?.results?.[0]?.picture?.large}
            />
          </div>
          <div className="card__body">
            <h2>{data?.results?.[0]?.name?.first}</h2>
            <h3>{data?.results?.[0]?.name?.last}</h3>
            <h4>{data?.results?.[0]?.location?.country}</h4>
          </div>
          <div className="card__footer">
            <Button>Fetch New User</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
