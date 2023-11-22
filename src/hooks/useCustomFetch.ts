import { useCallback, useEffect, useRef, useState } from "react";

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

const aborter = new AbortController();

const useCustomFetch = <TData>(fetcher: FetcherType<TData>) => {
  const mounted = useRef(false);
  const [data, setData] = useState<StateType<TData>>(initalState);

  const makeRequest = useCallback(async () => {
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
  }, [fetcher]);

  useEffect(() => {
    if (mounted.current) makeRequest();
    return () => {
      if (mounted.current) {
        aborter.abort();
        setData(initalState);
      }
      mounted.current = true;
    };
  }, [makeRequest]);

  return {
    ...data,
    isLoading: data.status === "pending",
    hasError: data.status === "error",
    isSuccess: data.status === "sucess",
    refetch: makeRequest,
  };
};

export default useCustomFetch;
