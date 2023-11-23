import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("Button component should render correctly", () => {
  render(<Button />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});

test("Button component should render its children correctly", () => {
  render(
    <Button>
      <h1>Title</h1>
    </Button>
  );
  const button = screen.getByRole("button");
  const h1 = screen.getByRole("heading");
  expect(button).toHaveTextContent("Title");
  expect(h1).toBeInTheDocument();
});
