Feature: Show/Hide Event Details
    Scenario: Hide event details by default.
        Given the main page is open
        When the user is viewing all the events
        Then the event elements will be collapsed by default.
    
    Scenario: User should see event details when they click a show more button.
        Given the main page is open
        When a user clicks on an event
        Then the event element will expand to reveal the details.

    Scenario: User can hide the event details by clicking a close button.
        Given an event element is expanded
        When a user clicks on the close button
        Then the event will collapse and hide details.