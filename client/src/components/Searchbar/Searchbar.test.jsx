import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Searchbar from ".";

describe("Searchbar", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Searchbar />
      </BrowserRouter>
    );
  });

  test("should update searchText state on input change", () => {
    const input = screen.getByTestId("input-search");
    fireEvent.change(input, { target: { value: "iPhone" } });
    expect(input).toHaveValue("iPhone");
  });

  test("should sync input value with searchText state", () => {
    const input = screen.getByTestId("input-search");
    fireEvent.change(input, { target: { value: "Samsung" } });
    expect(input).toHaveValue("Samsung");
  });
});
