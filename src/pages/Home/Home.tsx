import { useCustomFetch } from "@/hooks";
import Button from "@/components/Base/Button";
import { getUserData } from "./Home.api";
import styles from "./Home.module.scss";
import Skeleton from "@/components/Base/Skeleton";

const Home = () => {
  const { data, error, isLoading, hasError, refetch } =
    useCustomFetch(getUserData);

  return (
    <div className={styles.container}>
      {hasError && <p className="error">{error || "Could not fetch data"}</p>}
      <div className="card">
        <div className="card__header">
          {isLoading ? (
            <Skeleton className="card__header__skeleton" />
          ) : (
            <img
              className="card__header__avatar"
              src={data?.results?.[0]?.picture?.large}
            />
          )}
        </div>
        <div className="card__body">
          {isLoading && (
            <>
              <Skeleton className="card__body__skeleton" />
              <Skeleton className="card__body__skeleton" />
              <Skeleton className="card__body__skeleton" />
            </>
          )}
          <h2>{data?.results?.[0]?.name?.first}</h2>
          <h3>{data?.results?.[0]?.name?.last}</h3>
          <h4>{data?.results?.[0]?.location?.country}</h4>
        </div>
        <div className="card__footer">
          <Button disabled={isLoading} onClick={refetch}>
            Fetch New User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
