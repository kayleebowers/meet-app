Feature: Filter events by city
    Scenario: When user hasn’t searched for a city, show upcoming events from all cities.
        Given the user hasn’t searched for a city
        When the user opens the app
        Then they will see a list of upcoming events.

    Scenario: User should see a list of suggestions when they search for a city.
        Given the main page is open
        When the user types in the city textbox
        Then they will see a suggested list of cities that matches what they typed.

    Scenario: User can select a city from the suggested list.
        Given the user was typing for “Berlin” and saw a list of recommended cities
        When the user selects a city (like Berlin) from the list
        Then their city will change to that city AND they will see a list of events in that city.