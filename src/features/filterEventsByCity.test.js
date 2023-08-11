import { loadFeature, defineFeature } from "jest-cucumber";
const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, test => {
    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        given('the user hasn’t searched for a city', () => {

        });

        when('the user opens the app', () => {

        });

        then('they will see a list of upcoming events.', () => {

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