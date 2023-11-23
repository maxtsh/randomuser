import { useCallback, useEffect, useRef, useState } from "react";

type StateType<DataType> = {
  data: DataType | null;
  status: "pending" | "idle" | "sucess" | "error";
  error: string | null;
};

type FetcherType<DataType> = () => Promise<DataType>;

const initalState = {
  data: null,
  status: "idle" as const,
  error: null,
};

const useCustomFetch = <TData>(fetcher: FetcherType<TData>) => {
  const didFetch = useRef(false);
  const [data, setData] = useState<StateType<TData>>(initalState);

  const makeRequest = useCallback(async () => {
    setData({ data: null, status: "pending", error: null });
    try {
      const result = await fetcher();
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
    if (!didFetch.current) makeRequest();
    return () => {
      didFetch.current = true;
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
