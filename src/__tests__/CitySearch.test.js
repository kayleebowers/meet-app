/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import { render } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import userEvent from "@testing-library/user-event";

// describe new component scope
describe("<CitySearch /> component", () => {
    // test if input's existence and class
    test("renders text input", () => {
        const CitySearchComponent = render(<CitySearch />);
        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass("city");
    });

    test("suggestions list is hidden by default", () => {
        const CitySearchComponent = render(<CitySearch />);
        const suggestionList = CitySearchComponent.queryByRole("list");
        expect(suggestionList).not.toBeInTheDocument();
    });

    test("renders a list of suggestions when city textbox gains focus", async () => {
        const CitySearchComponent = render(<CitySearch />);
        // set user
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole("textbox");
        // await user interaction
        await user.click(cityTextBox);
        // define suggestionList once input is done
        const suggestionList = CitySearchComponent.queryByRole("list");
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass("suggestions");
    })
});