/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";

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
        given('the main page is open', () => {

        });

        when('a user clicks on an event', () => {

        });

        then('the event element will expand to reveal the details.', () => {

        });
    });

    test('User can hide the event details by clicking a close button.', ({ given, when, then }) => {
        given('an event element is expanded', () => {

        });

        when('a user clicks on the close button', () => {

        });

        then('the event will collapse and hide details.', () => {

        });
    });
})