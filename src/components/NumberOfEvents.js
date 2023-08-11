import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
  const [isValue, setValue] = useState("32");

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    setCurrentNOE(value);
  };

  console.log(isValue);

  return (
    <div id="event-number">
      <input
        type="text"
        value={isValue}
        onChange={handleChange}
      >
      </input>
    </div>
  );
};

export default NumberOfEvents;
