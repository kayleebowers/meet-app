import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, test => {
    test('Hide event details by default.', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('the user is viewing all the events', () => {

        });

        then('the event elements will be collapsed by default.', () => {

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