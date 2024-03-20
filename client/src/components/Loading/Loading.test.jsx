import { render, screen } from "@testing-library/react";
import Loading from ".";

describe("Loading", () => {
  beforeEach(() => {
    render(<Loading text="Cargando..."/>);
  });
  test("should render text prop", () => {
    expect(screen.queryByText("Cargando...")).toBeInTheDocument();
  });
});
