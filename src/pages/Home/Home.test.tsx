import { render, screen } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";
import Home from "./Home";

test("Home shows data on inital render", async () => {
  render(<Home />);

  const skeletons = await screen.findAllByRole("progressbar");
  expect(skeletons).toHaveLength(4);
  const headings = await screen.findAllByRole("heading");
  const image = screen.getByRole("img");
  expect(headings).toHaveLength(3);
  expect(image).toBeInTheDocument();
});

test("Home fetchs new data on user click on fetch button and probably highlights some data", async () => {
  render(<Home />);
  await screen.findAllByRole("heading");

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  await UserEvent.click(button);
  expect(button).toBeDisabled();

  const headings = await screen.findAllByRole("heading");

  headings.some((heading) =>
    expect(heading).toHaveClass("card__body__highlight"),
  );
});
