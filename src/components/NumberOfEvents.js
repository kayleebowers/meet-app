import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [isValue, setValue] = useState("32");

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    setCurrentNOE(value);
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
