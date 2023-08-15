Feature: Specify Number of Events
    Scenario: Display 32 events by default.
        Given the main page is open
        When a user has not specified a number of events
        Then thirty-two events will be shown by default.

    Scenario: When user changes the number of events, the number of events will change accordingly.
        Given the main page is open
        When a user adds or subtracts from the number of events button
        Then the number of events displayed will change accordingly.