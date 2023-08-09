/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";
import userEvent from "@testing-library/user-event";

describe("<NumberOfEvents /> component", () => {
    let NumberOfEventsComponent,
        numberTextbox;

    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
        numberTextbox = NumberOfEventsComponent.getByRole("textbox");
    })

    // test for existing element and default value
    test("render NumberOfEvents textbox", () => {
        expect(numberTextbox).toBeInTheDocument();
    });

    test("textbox has default value of 32", () => {
        expect(numberTextbox).toHaveValue("32");
    });

    // update value on user change
    test("change textbox value when user types new number", async () => {
        const user = userEvent.setup();
        await user.type(numberTextbox, "{backspace}{backspace}10");
        expect(numberTextbox).toHaveValue("10");
    })
})