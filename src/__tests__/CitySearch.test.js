/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render, within } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import userEvent from "@testing-library/user-event";
import { extractLocations, getEvents } from "../api";
import App from "../App";

// describe new component scope
describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });

  // test input's existence and class
  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    // set user
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole("textbox");

    // await user interaction
    await user.click(cityTextBox);
    
    // define suggestionList once input is done
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    //user types berlin into text box
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    // filter allLocations to those matching "Berlin"
    const suggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];

    //get all li in suggestions list
    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

    //add suggestion text to textbox on suggestion click
    test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
      const user = userEvent.setup();
      const allEvents = await getEvents();

      // get locations array from events
      const allLocations = extractLocations(allEvents);
      CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

      const cityTextBox = CitySearchComponent.queryByRole("textbox");
      await user.type(cityTextBox, "Berlin");

      // make sure suggestion's textContent looks like this: "Berlin, Germany"
      const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole("listitem")[0];

      await user.click(BerlinGermanySuggestion);
      expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    })
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // get textbox from within #city-search div, await click
    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
    await user.click(cityTextBox);

    //get events data and extract locations
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    //define suggestion items as content in li and test length  
    const suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
})
