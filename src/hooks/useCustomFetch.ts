import { useEffect, useRef, useState } from "react";

type StateType<DataType> = {
  data: DataType | null;
  status: "pending" | "idle" | "sucess" | "error";
  error: string | null;
};

type FetcherType<DataType> = (signal: AbortSignal) => Promise<DataType>;

const initalState = {
  data: null,
  status: "idle" as const,
  error: null,
};

const useCustomFetch = <TData>(fetcher: FetcherType<TData>) => {
  const mounted = useRef(false);
  const [random, setRandom] = useState("");
  const [data, setData] = useState<StateType<TData>>(initalState);

  useEffect(() => {
    const aborter = new AbortController();

    const fetchData = async () => {
      setData({ data: null, status: "pending", error: null });

      try {
        const result = await fetcher(aborter.signal);
        setData({ data: result, error: null, status: "sucess" as const });
      } catch (err) {
        if (err && typeof err === "string") {
          setData({ data: null, error: err, status: "error" as const });
        } else {
          setData({
            data: null,
            error: "Something went wrong!",
            status: "error" as const,
          });
        }
      }
    };

    if (mounted.current) fetchData();

    return () => {
      if (mounted.current) {
        aborter.abort();
        setData(initalState);
      }
      mounted.current = true;
    };
  }, [fetcher, random]);

  const refetch = () => setRandom(crypto.randomUUID());

  return { ...data, refetch };
};

export default useCustomFetch;
