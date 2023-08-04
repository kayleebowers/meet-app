# meet-app

## Project Description
The Meet App is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

### Key features
* Filter Events by City
* Show/Hide Event Details
* Specify Number of Events
* Use the App When Offline
* Add an App Shortcut to the Home Screen
* Display Charts Visualizing Event Details

### User stories and scenarios
* As a user, I should be able to filter events by city so that I can see a list of events taking place in that city.
  * Scenario 1: Given the user hasn’t searched for a city, when the user opens the app, then they will see a list of upcoming events.
  * Scenario 2: Given the main page is open, when the user types in the city textbox, then they will see a suggested list of cities that matches what they typed.
  * Scenario 3: Given the user was typing for “Berlin” and saw a list of recommended cities, when the user selects a city (like Berlin) from the list, then their city will change to that city AND they will see a list of events in that city  
* As a user, I should be able to show/hide event details so I can see the events I am interested in.
  * Scenario 1: Given the main page is open, when the user is viewing all the events, then the event elements will be collapsed by default.
  * Scenario 2: Given the main page is open, when a user clicks on an event, then the event element will expand to reveal the details.
  * Scenario 3: Given an event element is expanded, when a user clicks on the close button, then the event will collapse and hide details.
* As a user, I should be able to specify the number of events so I can see exactly how many events I wish to.
  * Scenario 1: Given the main page is open, when a user has not specified a number of events, then 32 events will be shown by default.
  * Scenario 2: Given the main page is open, when a user adds or subtracts from the number of events button, then the number of events displayed will change accordingly. 
* As a user, I should be able to use the app offline so I can access the event information at any time and from any place.
  * Scenario 1: Given a user has no internet connection, when the main page is open, it will show cached data.
  * Scenario 2: Given a user has no internet connection and only one search setting is cached, when a user changes search settings (city, number of events), the app will show an error.
* As a user, I should be able to add an app shortcut so I can easily access it from my device’s home screen.
  * Scenario 1: Given a device home screen, when a user installs the Meet App, then it will appear as a shortcut on the screen.
* As a user, I should be able to see charts visualizing event details so I know what kinds of events are available.
  * Scenario 1: Given the main page is open, when a user scrolls to the bottom of the page, then it will show a chart with the number of upcoming events in each city.

### Serverless Functions
The Meet App can use serverless functions for scalability, data retrieval, event notifications, and up-to-date responses and customization. Serverless functions can also support user authentication and enable the app to meet high or low user demands as needed. As such, users will have a smoother, more efficient experience while removing the need to support a complex server.

## Getting the Project Running

The application is hosted on [GitHub Pages](https://kayleebowers.github.io/meet-app/). The project can also be downloaded locally and started with `npm start`.

## Dependencies
* React
