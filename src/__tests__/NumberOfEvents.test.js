/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
    test("render NumberOfEvents textbox", () => {
        const NumberOfEventsComponent = render(<NumberOfEvents />);
        const numberTextbox = NumberOfEventsComponent.getByRole("textbox");
        expect(numberTextbox).toBeInTheDocument();
    })
})