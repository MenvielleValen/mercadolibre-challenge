import { render, screen } from "@testing-library/react";
import ItemCard from ".";
import { BrowserRouter } from "react-router-dom";

const mockProductApple = {
  id: "MLA123456",
  title:
    "Apple iPhone SE Se (3ª Generación, 64 Gb) - Azul Medianoche - Distribuidor Autorizado",
  price: {
    currency: "ARS",
    amount: 5000,
    decimals: 20,
  },
  picture: "http://http2.mlstatic.com/D_696564-MLA52130732644_102022-I.jpg",
  condition: "Nuevo",
  free_shipping: true,
  location: "Capital Federal",
};

const mockProductSamsung = {
  id: "MLA123456",
  title: "Samsung S22",
  price: {
    currency: "USD",
    amount: 5000,
    decimals: 20,
  },
  picture: "http://http2.mlstatic.com/D_696564-MLA52130732644_102022-I.jpg",
  condition: "Nuevo",
  free_shipping: false,
  location: "Capital Federal",
};

describe("ItemCard", () => {
  test("should render Link with correct props based on item data", () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockProductApple} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: mockProductApple.title });

    expect(link).toHaveAttribute("href", `/items/${mockProductApple.id}`);
    expect(link).toHaveAttribute("aria-label", mockProductApple.title);
    expect(link).toHaveAttribute("title", mockProductApple.title);
  });

  test("should render title", () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockProductApple} />
      </BrowserRouter>
    );
    const title = screen.getByTestId("item-title");
    expect(title.textContent).toBe(
      "Apple iPhone SE Se (3ª Generación, 64 Gb) - Azul Medianoche - Distribuidor Autorizado"
    );
  });

  test("should render location", () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockProductApple} />
      </BrowserRouter>
    );
    const location = screen.getByTestId("item-location");
    expect(location.textContent).toBe("Capital Federal");
  });

  test("should render free shipping icon", () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockProductApple} />
      </BrowserRouter>
    );
    const shippingIcon = screen.queryByTestId("free-shipping-icon");
    expect(shippingIcon).toBeDefined();
  });

  test("should not render free shipping icon", () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockProductSamsung} />
      </BrowserRouter>
    );
    const shippingIcon = screen.queryByTestId("free-shipping-icon");
    expect(shippingIcon).toBeNull();
  });

  test("should render price amount (ARS)", () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockProductApple} />
      </BrowserRouter>
    );
    const amountText = screen.getByTestId("item-amount");
    expect(amountText.textContent).toBe("$ 5.000");
  });

  test("should render price amount (USD)", () => {
    render(
      <BrowserRouter>
        <ItemCard item={mockProductSamsung} />
      </BrowserRouter>
    );
    const amountText = screen.getByTestId("item-amount");
    expect(amountText.textContent).toBe("US$ 5.000");
  });
});
