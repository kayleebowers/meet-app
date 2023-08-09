/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe("<EventList /> component", () => {
    let EventListComponent;
    beforeEach(() => {
        // get outcome of render
        EventListComponent = render(<EventList />);
    });

    test("has an element with 'list' role", () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    test("renders correct number of events", async () => {
        const allEvents = await getEvents();
        // rerender to include events prop
       EventListComponent.rerender(<EventList events={allEvents} />);
       expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    })
});