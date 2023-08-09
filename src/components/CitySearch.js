import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
  })

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputChange}
      />
      {showSuggestions ? 
        <ul className="suggestions">
            {/* return suggestions based off input */}
            {suggestions.map((suggestion) => {
                return <li key={suggestion}>{suggestion}</li>
            })}
            <li key="See all cities">
                <b>See all cities</b>
            </li>
        </ul> : null}
    </div>
  );
};

export default CitySearch;
