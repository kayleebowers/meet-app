/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import Event from "../components/Event";
// import { getEvents } from "../api";
import mockData from "../mock-data";

describe("<Event /> component", () => {
    let testData,
        eventComponent;

    beforeEach(() => {
        testData = mockData[0];
        eventComponent = render(<Event event={testData} />);
    })

    test("render Event title", () => {
        expect(eventComponent.getByText(testData.summary)).toBeInTheDocument();
    });

    test("render Event start time", () => {
        expect(eventComponent.getByText(testData.created)).toBeInTheDocument();
    });

    test("render Event location", () => {
        expect(eventComponent.getByText(testData.location)).toBeInTheDocument();
    })
})