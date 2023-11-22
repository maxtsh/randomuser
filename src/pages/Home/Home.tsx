import { useEffect, useRef, useState } from "react";
import { getUserData } from "./Home.api";
import type { StateType } from "./Home.types";

const initalState = {
  data: null,
  status: "idle" as const,
  error: null,
};

const Home = () => {
  const mounted = useRef(false);
  const [data, setData] = useState<StateType>(initalState);

  useEffect(() => {
    const aborter = new AbortController();

    const fetchData = async () => {
      setData({ data: null, status: "pending", error: null });
      const result = await getUserData(aborter.signal);
      setData(result);
    };

    if (mounted.current) fetchData();

    return () => {
      if (mounted.current) {
        aborter.abort();
        setData(initalState);
      }
      mounted.current = true;
    };
  }, []);

  return (
    <div>
      {data.status === "pending" && <p>Fetching data...</p>}
      {data.status === "error" && (
        <p>{data?.error || "Could not fetch data"}</p>
      )}
      {data.status === "sucess" && (
        <div>
          <h1>{data.data?.results?.[0]?.name?.first}</h1>
          <h1>{data.data?.results?.[0]?.name?.last}</h1>
          <h1>{data.data?.results?.[0]?.location?.country}</h1>
          <img src={data.data?.results?.[0]?.picture?.large} />
        </div>
      )}
    </div>
  );
};

export default Home;
