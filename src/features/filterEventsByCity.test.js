/* eslint-disable testing-library/no-node-access */
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import App from "../App";
import EventList from "../components/EventList";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, test => {
    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        //empty because nothing happens or changes
        given('the user hasn’t searched for a city', () => {
        });

        let AppComponent;
        when('the user opens the app', () => {
            // simulate user opening app
            AppComponent = render(<App />);
        });

        then('they will see a list of upcoming events.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector("#event-list");

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole("listitem");
                expect(EventListItems.length).toBe(32);
            })
        });
    });

    test('User should see a list of suggestions when they search for a city.', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('the user types in the city textbox', () => {

        });

        then('they will see a suggested list of cities that matches what they typed.', () => {

        });
    });

    test('User can select a city from the suggested list.', ({ given, when, then }) => {
        given('the user was typing for “Berlin” and saw a list of recommended cities', () => {

        });

        when('the user selects a city (like Berlin) from the list', () => {

        });

        then('their city will change to that city AND they will see a list of events in that city.', () => {

        });
    });
});