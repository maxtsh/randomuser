import type { UserResponse } from "./Home.types";

export const getUserData = async (signal: AbortSignal) => {
  try {
    const res = await fetch("https://randomuser.me/api", {
      signal,
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
    if (res.ok) {
      const data: UserResponse = await res.json();
      return { data, error: null, status: "sucess" as const };
    } else {
      return {
        data: null,
        status: "error" as const,
        error: res.statusText,
      };
    }
  } catch (err) {
    return {
      data: null,
      status: "error" as const,
      error: "Failed to fetch the data",
    };
  }
};
