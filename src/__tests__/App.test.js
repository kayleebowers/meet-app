/* eslint-disable testing-library/no-node-access */
import { render } from "@testing-library/react";
import App from "../App";

// define scope called <App /> component
describe("< App /> component", () => {
    test("renders list of events", () => {
        const AppDOM = render(< App />).container.firstChild;
        expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
    });
    test("render city search", () => {
        const AppDOM = render(< App />).container.firstChild;
        expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
    });
});

