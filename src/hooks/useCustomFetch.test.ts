import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import useCustomFetch from "./useCustomFetch";

const server = setupServer(
  http.get("https://randomuser.me/api", () => {
    return HttpResponse.json([
      {
        id: 1,
        userId: 1,
        firstName: "test",
        lastName: "test",
      },
    ]);
  }),
);

const fetchData = async () => {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  return data;
};

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

test("Makes successful a GET request to fetch data", async () => {
  const { result } = renderHook(() => useCustomFetch(fetchData));

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.data).toHaveLength(1);
  });
});

test("Makes an unsuccessful GET request to fetch data", async () => {
  server.use(
    http.get("https://randomuser.me/api", () => {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not found",
      });
    }),
  );

  const { result } = renderHook(() => useCustomFetch(fetchData));

  await waitFor(() => {
    expect(result.current.hasError).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });
});
