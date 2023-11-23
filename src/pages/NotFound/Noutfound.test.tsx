import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Notfound from "./Notfound";

test("Nout found page should render correctly", () => {
  render(
    <MemoryRouter>
      <Notfound />
    </MemoryRouter>,
  );

  const link = screen.getByRole("link");
  const message = screen.getByRole("heading");
  expect(link).toBeInTheDocument();
  expect(message).toBeInTheDocument();
});
