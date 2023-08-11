import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [isValue, setValue] = useState("32");

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    setCurrentNOE(value);
  };

  return (
    <form id="event-number">
      <label>Enter a number between 1 and 32</label>
      <input
        type="text"
        value={isValue}
        onChange={handleChange}
      ></input>
    </form>
  );
};

export default NumberOfEvents;
