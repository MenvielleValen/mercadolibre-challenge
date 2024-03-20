import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { ResultsPage } from ".";
import { render, screen, waitFor } from "@testing-library/react";


describe("ResultsPagetest", () => {
    test("should render loading component", async () => {
      const routes = [
        {
          path: "/items",
          element: <ResultsPage />,
        },
      ];
  
      const router = createMemoryRouter(routes, {
        initialEntries: [`/items/?search=autos`],
        initialIndex: 0,
      });
  
      render(<RouterProvider router={router} />);
  
      await waitFor(() => {
        const loader = screen.getByText("Buscando autos en Mercado Libre...");
        expect(loader).toBeInTheDocument();
      });
    });
  });