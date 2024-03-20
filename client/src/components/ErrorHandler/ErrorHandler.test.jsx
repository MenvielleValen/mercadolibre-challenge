import { render, screen } from "@testing-library/react";
import { errors } from "../../constants/errors";
import { BrowserRouter } from "react-router-dom";
import ErrorHandler from ".";

const notFound = {
  type: errors.not_found,
};

const responseError = {
  type: errors.unknown_error,
  message: "Error desconocido",
};

describe("ErrorHandler", () => {
  test("should render not found error message", () => {
    render(
      <BrowserRouter>
        <ErrorHandler error={notFound} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Parece que esta página no existe./i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/Ocurrió un error/i)
    ).not.toBeInTheDocument();
  });

  test("should render response error message", () => {
    render(
      <BrowserRouter>
        <ErrorHandler error={responseError} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Ocurrió un error./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Error desconocido/i)
    ).toBeInTheDocument();
  });

  test("should render message and type if available", () => {
    render(
      <BrowserRouter>
        <ErrorHandler error={responseError} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Ocurrió un error./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Error desconocido/i)
    ).toBeInTheDocument();
  });

  test("should render link to home page", () => {
    render(
      <BrowserRouter>
        <ErrorHandler error={notFound} />
      </BrowserRouter>
    );
    expect(
      screen.getByRole("link", { name: /Ir a la página principal/i })
    ).toBeInTheDocument();
  });
});
