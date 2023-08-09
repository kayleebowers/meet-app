/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */

import { render } from "@testing-library/react";
import CitySearch from "../components/CitySearch";
import userEvent from "@testing-library/user-event";

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
    const suggestionListItems = CitySearchComponent.queryByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestionListItems.length + 1);
    for (let i = 0; i < suggestions.length; i++) {
      expect(suggestionListItems[i].textContent).toBe(suggestions);
    }
  });

});
