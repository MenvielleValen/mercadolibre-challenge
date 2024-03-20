import { render, screen } from "@testing-library/react";
import Breadcrumbs from "./";

const mockItems = ["item1", "item2", "item3", "item4"];

describe("Breadcrumbs", () => {
  beforeEach(() => {
    render(<Breadcrumbs items={mockItems} />);
  });
  test("should render list items", () => {
    const li = screen.getAllByRole("listitem");
    expect(li.length).toEqual(4);
  });
  test("should render text of list items", () => {
    mockItems.forEach((name) => {
      expect(screen.queryByText(name)).toBeInTheDocument();
    });
  });
  test("should be arrows on all elements except the last one", () => {
    expect(screen.queryAllByText(">").length).toEqual(mockItems.length - 1);
  });
});
