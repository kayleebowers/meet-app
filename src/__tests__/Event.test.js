/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import Event from "../components/Event";
// import { getEvents } from "../api";
import mockData from "../mock-data";

describe("<Event /> component", () => {
    test("render Event title", async () => {
        const testData = mockData[0];
        const eventComponent = render(<Event event={testData} />);
        expect(eventComponent.getByText(testData.summary)).toBeInTheDocument();
    });

    
})