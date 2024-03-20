import { render, screen } from "@testing-library/react";
import ItemDetail from ".";

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
  description: "Descripción Apple iPhone SE",
  sold_quantity: 500
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
  description: "Descripción del producto",
  sold_quantity: 10
};

describe("ItemDetail", () => {
  test("should render title", () => {
    render(
        <ItemDetail item={mockProductApple} />
    );
    const title = screen.getByTestId("item-title");
    expect(title.textContent).toBe(
      "Apple iPhone SE Se (3ª Generación, 64 Gb) - Azul Medianoche - Distribuidor Autorizado"
    );
  });

  test("should render description", () => {
    render(
        <ItemDetail item={mockProductApple} />
    );
    const description = screen.getByTestId("item-description");
    expect(description.textContent).toBe(
      "Descripción Apple iPhone SE"
    );
  });

  test("should render price amount and decimals (ARS)", () => {
    render(
        <ItemDetail item={mockProductApple} />
    );
    const amountText = screen.getByTestId("item-amount");
    expect(amountText.textContent).toBe("$ 5.00020");
  });

  test("should render price amount and decimals (USD)", () => {
    render(
        <ItemDetail item={mockProductSamsung} />
    );
    const amountText = screen.getByTestId("item-amount");
    expect(amountText.textContent).toBe("US$ 5.00020");
  });

  test("should render image", () => {
    render(
        <ItemDetail item={mockProductApple} />
    );

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", mockProductApple.picture);
    expect(image).toHaveAttribute("alt", mockProductApple.title);
    expect(image).toHaveAttribute("title", mockProductApple.title);
  });

  test("should render condition and sold quantity", () => {
    render(
        <ItemDetail item={mockProductSamsung} />
    );
    const conditionText = screen.getByTestId("item-condition");
    expect(conditionText.textContent).toBe("Nuevo - 10 vendidos");
  });
});
