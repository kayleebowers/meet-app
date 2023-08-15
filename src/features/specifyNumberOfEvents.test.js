/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from "jest-cucumber";
import App from "../App";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import EventList from "../components/EventList";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
    test('Display 32 events by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        when('a user has not specified a number of events', () => {
            // nothing changes
        });

        then('thirty-two events will be shown by default.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(32);
            }) 
        });
    });

    test('When user changes the number of events, the number of events will change accordingly.', ({ given, when, then }) => {
        let AppComponent;
        let EventListComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
            EventListComponent = render(<EventList />);
        });

        let numberTextbox
        when('a user adds or subtracts from the number of events button', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            numberTextbox = AppDOM.querySelector("#number-of-events-input");
            await user.type(numberTextbox, "{backspace}{backspace}10");
        });

        then('the number of events displayed will change accordingly.', async () => {
            // rerender to include updated events prop
            expect(EventListComponent.getAllByRole("listitem")).toHaveLength(10);
        });
    });
});