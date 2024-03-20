import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Logo from ".";

describe("Logo", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Logo/>
            </BrowserRouter>
        )
    });

    test("should show image", () => {
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
    });
    
    test("should contain a link", () => {
        const link = screen.getByRole("link");
        expect(link).toBeInTheDocument();
    });

})