/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // make sure suggestions update on App render
  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]);

  //handle input change
  const handleInputChange = ((event) => {
    //get current input value
    const value = event.target.value;
    
    //filter all locations to match input
    const filteredLocations = allLocations ? allLocations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];

    setQuery(value);
    setSuggestions(filteredLocations);

    // define info alert message if no city is found
    let infoText;
    if (filteredLocations.length === 0) {
      infoText = "We can not find the city you are looking for. Please try another city";
    } else {
      infoText = "";
    }
    setInfoAlert(infoText);
  })

  //handle suggestion click
  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("");
  }

  return (
    <div id="city-search">
      <label htmlFor="city-search-bar">Your location: </label>
      <input
        type="text"
        className="city"
        id="city-search-bar"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChange}
      />
      {showSuggestions ? 
        <ul className="suggestions">
            {/* return suggestions based off input */}
            {suggestions.map((suggestion) => {
                return <li key={suggestion} className="city-suggestion" onClick={handleItemClicked}>{suggestion}</li>
            })}
            <li key="See all cities" onClick={handleItemClicked}>
                <b>See all cities</b>
            </li>
        </ul> : null}
    </div>
  );
};

export default CitySearch;
