import { render, screen } from "@testing-library/react";
import { NotFoundPage } from ".";
import { BrowserRouter } from "react-router-dom";

describe("NotFoundPage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NotFoundPage/>
      </BrowserRouter>
    );
  });
  test("should show Parece que esta página no existe.", () => {
    expect(screen.queryByText(/Parece que esta página no existe./i)).toBeInTheDocument();
  });
});
