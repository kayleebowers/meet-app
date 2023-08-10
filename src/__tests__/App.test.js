/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

// define scope called <App /> component
describe("< App /> component", () => {
    let AppDOM;
    beforeEach(() => {
        // get App's first child
        AppDOM = render(< App />).container.firstChild;
    })

    test("renders list of events", () => {
        expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
    });

    test("render city search", () => {
        expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
    });

    test("render number of events textbox", () => {
        expect(AppDOM.querySelector("#event-number")).toBeInTheDocument();
    })
});

// define integration scope
describe("<App /> integration", () => {
    test("renders a list of events matching the city selected by the user", async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector("#city-search");
        const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText("Berlin, Germany");
        await user.click(berlinSuggestionItem);

        const EventListDOM = AppDOM.querySelector("#event-list");
        const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(event => event.location === "Berlin, Germany");

        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    })
})

