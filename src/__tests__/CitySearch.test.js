/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import CitySearch from "../components/CitySearch";

// describe new component scope
describe("<CitySearch /> component", () => {
    // test if input's existence and class
    test("renders text input", () => {
        const CitySearchComponent = render(<CitySearch />);
        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass("city");
    });
});