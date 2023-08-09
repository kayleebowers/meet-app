/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
    })

    test("render NumberOfEvents textbox", () => {
        const numberTextbox = NumberOfEventsComponent.getByRole("textbox");
        expect(numberTextbox).toBeInTheDocument();
    });

    test("textbox has default value of 32", () => {
        const numberTextbox = NumberOfEventsComponent.getByRole("textbox");
        expect(numberTextbox).toHaveValue("32");
    });
})