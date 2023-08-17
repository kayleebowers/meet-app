import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [isValue, setValue] = useState("32");

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    setCurrentNOE(value);

    // define error message if value is not a number
    if (value <= 0) {
      setErrorAlert("Your search number must be greater than 0");
      setCurrentNOE("32");
    } else if (isNaN(value)) {
      setErrorAlert("Your search must be a positive number");
      setCurrentNOE("32");
    } else {
      setErrorAlert("");
    }
  };

  return (
    <div id="event-number">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={isValue}
        onChange={handleChange}
      >
      </input>
    </div>
  );
};

export default NumberOfEvents;
