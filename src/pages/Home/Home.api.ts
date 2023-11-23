import type { UserResponse } from "./Home.types";

export const getUserData = async () => {
  try {
    const res = await fetch("https://randomuser.me/api", {
      headers: {
        "Content-Type": "application/json; utf-8",
      },
    });
    if (res.ok) {
      const data: UserResponse = await res.json();
      return data;
    } else {
      return Promise.reject(`Failed with stauts of ${res.status}`);
    }
  } catch (err) {
    return Promise.reject("Failed to fetch the data");
  }
};
