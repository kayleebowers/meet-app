/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
        // set mock App component and DOM
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        //select city search div and get input within
        const CitySearchDOM = AppDOM.querySelector("#city-search");
        const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

        //simulate typing Berlin and clicking on its list item
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText("Berlin, Germany");
        await user.click(berlinSuggestionItem);

        //get remaining Event list items after user search 
        const EventListDOM = AppDOM.querySelector("#event-list");
        const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

        //get all events with matching location
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(event => event.location === "Berlin, Germany");

        //number of rendered events should equal number all matching location events
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);

        //event text content should include location
        allRenderedEventItems.forEach((event) => {
            expect(event.textContent).toContain("Berlin, Germany");
        });
    });
    
    test("renders number of events selected by user", async () => {
        const user = userEvent.setup();

        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        //select number input 
        const NumberOfEventsInput = AppDOM.querySelector("#event-number");

        // simulate user input
        await user.type(NumberOfEventsInput, "{backspace}{backspace}10");

        //get remaining Event list items after number input
        const EventListDOM = AppDOM.querySelector("#event-list");
        const allRenderedEventItems = within(EventListDOM).queryAllByRole("listitem");

        //get event list of matching length
        const allEvents = await getEvents();
        const NumberedEvents = allEvents.slice(0, 10);

        //number of rendered events should equal allEvents.length
        expect(allRenderedEventItems.length).toBe(NumberedEvents.length);
    })
})

