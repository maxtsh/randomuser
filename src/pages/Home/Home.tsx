import { useRef, useState } from "react";
import { useCustomFetch } from "@/hooks";
import Button from "@/components/Base/Button";
import Skeleton from "@/components/Base/Skeleton";
import { getUserData } from "./Home.api";
import styles from "./Home.module.scss";
import type { UserType } from "./Home.types";

let timeoutId: ReturnType<typeof setTimeout> | null = null;

const Home = () => {
  const [highlighFlag, setHighlightFlag] = useState(false);
  const trackingData = useRef<UserType | null>(null);
  const { data, error, isLoading, hasError, refetch } =
    useCustomFetch(getUserData);

  const user: UserType = {
    firstName: data?.results?.[0]?.name?.first,
    lastName: data?.results?.[0]?.name?.last,
    country: data?.results?.[0]?.location?.country,
    avatar: data?.results?.[0]?.picture?.large,
  };

  const shouldHighlight = {
    firstName: Boolean(
      highlighFlag &&
        trackingData.current?.firstName &&
        trackingData.current.firstName !== user.firstName,
    ),
    lastName: Boolean(
      highlighFlag &&
        trackingData.current?.lastName &&
        trackingData.current.lastName !== user.lastName,
    ),
    country: Boolean(
      highlighFlag &&
        trackingData.current?.country &&
        trackingData.current.country !== user.country,
    ),
    avatar: Boolean(
      highlighFlag &&
        trackingData.current?.avatar &&
        trackingData.current.avatar !== user.avatar,
    ),
  };

  const handleRefetch = () => {
    const hasChanges =
      JSON.stringify(trackingData.current) !== JSON.stringify(user);

    if (hasChanges) {
      if (timeoutId) clearTimeout(timeoutId);
      setHighlightFlag(true);
      timeoutId = setTimeout(() => setHighlightFlag(false), 2000);
    }

    trackingData.current = user;
    refetch();
  };

  return (
    <div className={styles.container}>
      {hasError && <p className="error">{error || "Could not fetch data"}</p>}
      <div className="card">
        <div className="card__header">
          {isLoading ? (
            <Skeleton className="card__header__skeleton" />
          ) : (
            <img
              className={`card__header__avatar ${
                shouldHighlight.avatar ? "highlight" : ""
              }`}
              src={user.avatar}
            />
          )}
        </div>
        <div className="card__body">
          {isLoading ? (
            <>
              <Skeleton className="card__body__skeleton" />
              <Skeleton className="card__body__skeleton" />
              <Skeleton className="card__body__skeleton" />
            </>
          ) : (
            <>
              <h2
                className={
                  shouldHighlight.firstName ? "card__body__highlight" : ""
                }>
                {user.firstName}
              </h2>
              <h3
                className={
                  shouldHighlight.lastName ? "card__body__highlight" : ""
                }>
                {user.lastName}
              </h3>
              <h4
                className={
                  shouldHighlight.country ? "card__body__highlight" : ""
                }>
                {user.country}
              </h4>
            </>
          )}
        </div>
        <div className="card__footer">
          <Button disabled={isLoading} onClick={handleRefetch}>
            Fetch New User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
