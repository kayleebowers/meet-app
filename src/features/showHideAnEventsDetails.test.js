/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
    test('Hide event details by default.', ({ given, when, then }) => {
        let AppComponent;
        // simulate opening app
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });
       
        when('the user is viewing all the events', () => {
            // nothing changes
        });

        then('the event elements will be collapsed by default.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");

            // await event list and check event for null event details element
            await waitFor(() => {
                const eventListItems = within(EventListDOM).queryAllByRole("listitem");
                const eventDetails = eventListItems[0].querySelector(".event-details");
                expect(eventDetails).toBeNull();
            })
        });
    });

    test('User should see event details when they click a show more button.', ({ given, when, then }) => {
        let AppComponent;
        given('the main page is open', () => {
            AppComponent = render(<App />);
        });

        let eventListItems;
        let seeDetailsButton;
        when('a user clicks on an event', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");
            await waitFor(() => {
                eventListItems = within(EventListDOM).queryAllByRole("listitem");
                seeDetailsButton = eventListItems[0].querySelector(".details-btn");
            })
            await user.click(seeDetailsButton);
        });

        then('the event element will expand to reveal the details.', () => {
            const eventDetails = eventListItems[0].querySelector(".event-details");
            expect(eventDetails).toBeInTheDocument();
            expect(eventDetails).toHaveClass("event-details");
        });
    });

    test('User can hide the event details by clicking a close button.', ({ given, when, then }) => {
        let AppComponent;
        let seeDetailsButton;
        let eventListItems;
        // simulate clicking show details button
        given('an event element is expanded', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");
            await waitFor(() => {
                eventListItems = within(EventListDOM).queryAllByRole("listitem");
                seeDetailsButton = eventListItems[0].querySelector(".details-btn");
            })
            await user.click(seeDetailsButton);
        });

        let eventDetails;
        // simulate clicking hide details button
        when('a user clicks on the close button', async () => {
            const user = userEvent.setup();
            eventDetails = eventListItems[0].querySelector(".event-details");
            const closeButton = eventDetails.querySelector(".hide-details-btn");
            await user.click(closeButton);
        });

        then('the event will collapse and hide details.', () => {
            expect(eventDetails).not.toBeInTheDocument();
        });
    });
})