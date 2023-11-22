import { useCustomFetch } from "@/hooks";
import { getUserData } from "./Home.api";

const Home = () => {
  const { data, error, status } = useCustomFetch(getUserData);

  return (
    <div>
      {status === "pending" && <p>Fetching data...</p>}
      {status === "error" && <p>{error || "Could not fetch data"}</p>}
      {status === "sucess" && (
        <div>
          <h1>{data?.results?.[0]?.name?.first}</h1>
          <h1>{data?.results?.[0]?.name?.last}</h1>
          <h1>{data?.results?.[0]?.location?.country}</h1>
          <img src={data?.results?.[0]?.picture?.large} />
        </div>
      )}
    </div>
  );
};

export default Home;
