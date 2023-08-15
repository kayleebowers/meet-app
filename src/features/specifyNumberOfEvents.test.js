import { loadFeature, defineFeature } from "jest-cucumber";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, test => {
    test('Display 32 events by default.', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('a user has not specified a number of events', () => {

        });

        then('thirty-two events will be shown by default.', () => {

        });
    });

    test('When user changes the number of events, the number of events will change accordingly.', ({ given, when, then }) => {
        given('the main page is open', () => {

        });

        when('a user adds or subtracts from the number of events button', () => {

        });

        then('the number of events displayed will change accordingly.', () => {

        });
    });
});