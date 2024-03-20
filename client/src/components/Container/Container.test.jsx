import { render, screen } from "@testing-library/react";
import Container from ".";

describe("ErrorHandler", () => {
  beforeEach(() => {
    render(
      <Container>
        <h1>Unit test</h1>
      </Container>
    );
  });
  test("should render children element", () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
  test("should render children text", () => {
    expect(screen.getByText(/Unit test/i)).toBeInTheDocument();
  });
});
