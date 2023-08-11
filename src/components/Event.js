import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>Show Details</button>
      {showDetails ? (
        <div className="event-details" role="event-details">
            <p className="details">{event.description}</p>
            <button ariaHidden="true" onClick={() => setShowDetails(!showDetails)}>Hide Details</button>
        </div>
      ) : null}
    </li>
  );
};

export default Event;
