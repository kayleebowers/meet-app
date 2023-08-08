/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import App from "../App";

// define scope called <App /> component
describe("< App /> component", () => {
    let AppDOM;
    beforeEach(() => {
        // get App's first child
        AppDOM = render(< App />).container.firstChild;
    })

    test("renders list of events", () => {
        expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
    });

    test("render city search", () => {
        expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
    });

});

