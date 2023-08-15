/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import Event from "../components/Event";
// import { getEvents } from "../api";
import mockData from "../mock-data";
import userEvent from "@testing-library/user-event";

describe("<Event /> component", () => {
    let testData,
        eventComponent;

    beforeEach(() => {
        testData = mockData[0];
        eventComponent = render(<Event event={testData} />);
    })

    // render all default elements
    test("render Event title", () => {
        expect(eventComponent.getByText(testData.summary)).toBeInTheDocument();
    });

    test("render Event start time", () => {
        expect(eventComponent.getByText(testData.created)).toBeInTheDocument();
    });

    test("render Event location", () => {
        expect(eventComponent.getByText(testData.location)).toBeInTheDocument();
    });

    test("render Event button with title Show Details", () => {
        expect(eventComponent.getByText("Show Details")).toBeInTheDocument();
    });

    // display event details or not 
    test("hide Show Details element by default", () => {
        expect(eventComponent.queryByText(testData.description)).not.toBeInTheDocument();
    });

    test("show details when user clicks Show Details button", async () => {
        const user = userEvent.setup();
        const detailsButton = eventComponent.getByText("Show Details");
        await user.click(detailsButton);
        const eventDetails = eventComponent.getByTestId("event-details");
        expect(eventDetails).toBeInTheDocument();
        expect(eventDetails).toHaveClass("event-details");
    });

    test("hide details when user clicks on Hide Details button", async () => {
        const user = userEvent.setup();
        // show details 
        const detailsButton = eventComponent.getByText("Show Details");
        await user.click(detailsButton);
        // hide details
        const eventDetails = eventComponent.getByTestId("event-details");
        const closeButton = eventComponent.getByText("Hide Details");
        await user.click(closeButton);
        expect(eventDetails).not.toBeInTheDocument();
    });
})