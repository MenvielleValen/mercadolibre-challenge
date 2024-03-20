import { render, screen } from "@testing-library/react";
import Button from ".";

describe("Button", () => {
  beforeEach(() => {
    render(
      <Button>
        Comprar
      </Button>
    );
  });
  test("should render button element", () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  test("should render children text", () => {
    expect(screen.getByText(/Comprar/i)).toBeInTheDocument();
  });
});
