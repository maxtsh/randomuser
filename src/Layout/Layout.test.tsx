import { render, screen } from "@testing-library/react";
import Layout from "./Layout";

test("Layout is rendering correctly", () => {
  render(<Layout />);
  const main = screen.getByRole("main");
  expect(main).toBeInTheDocument();
});
