import { render, screen } from "@testing-library/react";
import { beforeEach, describe, test } from "vitest";
import ItemsList from ".";
import { BrowserRouter } from "react-router-dom";

const mockItems = [
  {
    id: "1",
    title: "Item 1",
    price: {
      currency: "ARS",
      amount: 100,
      decimals: 0,
    },
    picture: "image1.jpg",
    condition: "Nuevo",
    free_shipping: true,
    location: "Location 1",
  },
  {
    id: "2",
    title: "Item 2",
    price: {
      currency: "USD",
      amount: 50,
      decimals: 0,
    },
    picture: "image2.jpg",
    condition: "Nuevo",
    free_shipping: false,
    location: "Location 2",
  },
];

describe("ItemsList", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ItemsList items={mockItems} />
      </BrowserRouter>
    );
  });
  test("should render items correctly", () => {
    const itemElements = screen.getAllByTestId("item-card");
    expect(itemElements).toHaveLength(mockItems.length);
  });

  test("should render item separators", () => {
    const separatorElements = screen.getAllByTestId("item-list-divider");
    expect(separatorElements).toHaveLength(mockItems.length - 1);
  });
});
