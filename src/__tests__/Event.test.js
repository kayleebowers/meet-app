/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
    test("render Event title", async () => {
        const events = await getEvents;
        console.log(events);
        const eventComponent = render(<Event events={events[0]}/>);
        expect(eventComponent.getByText(events[0].summary)).toBeInTheDocument();
    })
})