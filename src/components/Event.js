import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <h3>{event.summary}</h3>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button onClick={() => setShowDetails(!showDetails)}>Show Details</button>
      {showDetails ? (
        <div className="event-details" role="event-details">
            <p>{event.description}</p>
            <button ariaHidden="true" onClick={() => setShowDetails(!showDetails)}>Hide Details</button>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
